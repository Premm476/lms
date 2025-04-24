import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

/**
 * Example Google Pay payment verification endpoint.
 * Replace placeholder verification logic with actual Google Pay token verification.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { paymentToken, orderId } = req.body;

    if (!paymentToken || !orderId) {
      return res.status(400).json({ message: 'Missing paymentToken or orderId' });
    }

    // TODO: Verify paymentToken with Google Pay API or your payment gateway

    // For example, decode and verify the payment token here

    // Update order status in database
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'completed' },
    });

    // If payment successful, create enrollment if not exists and send confirmation email
    if (updatedOrder.status === 'completed') {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: updatedOrder.userId,
            courseId: updatedOrder.courseId,
          },
        },
      });

      if (!enrollment) {
        await prisma.enrollment.create({
          data: {
            userId: updatedOrder.userId,
            courseId: updatedOrder.courseId,
          },
        });

        // Send confirmation email to student
          try {
            const { sendNotificationEmail } = await import('../../../lib/email');
            // Fetch user email and course title for email content
            const user = await prisma.user.findUnique({ where: { id: updatedOrder.userId } });
            const course = await prisma.course.findUnique({ where: { id: updatedOrder.courseId } });
            if (user && course) {
              const subject = `Enrollment Confirmation for ${course.title}`;
              const message = `Dear ${user.name || user.email},\n\nYou have been successfully enrolled in the course "${course.title}". Enjoy learning!\n\nBest regards,\nE-Learning Platform Team`;
              await sendNotificationEmail(user.email, subject, message);
            }
          } catch (emailError) {
            console.error('Error sending payment confirmation email:', emailError);
          }
      }
    }

    return res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Error verifying Google Pay payment:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
