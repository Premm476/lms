import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

/**
 * Example PhonePe payment callback handler.
 * Replace placeholder verification logic with actual PhonePe API verification.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const callbackData = req.body;

    // TODO: Verify callbackData authenticity using PhonePe merchant secret and signature verification

    // Extract order ID and payment status from callbackData (adjust according to PhonePe callback format)
    const { merchantOrderId, status } = callbackData;

    if (!merchantOrderId || !status) {
      return res.status(400).json({ message: 'Invalid callback data' });
    }

    // Update order status in database
    const updatedOrder = await prisma.order.update({
      where: { id: merchantOrderId },
      data: { status: status === 'SUCCESS' ? 'completed' : 'failed' },
    });

    // If payment successful, create enrollment if not exists and send confirmation email
    if (status === 'SUCCESS') {
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

    // Respond with success acknowledgment
    return res.status(200).json({ message: 'Callback processed successfully' });
  } catch (error) {
    console.error('Error processing PhonePe callback:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
