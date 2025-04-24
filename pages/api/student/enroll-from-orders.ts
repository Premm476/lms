import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all completed orders for user without enrollment
    const completedOrders = await prisma.order.findMany({
      where: {
        userId: user.id,
        status: 'completed',
        NOT: {
          course: {
            enrollments: {
              some: {
                userId: user.id,
              },
            },
          },
        },
      },
      include: {
        course: true,
      },
    });

    // Create enrollments for courses without enrollment
    for (const order of completedOrders) {
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: order.courseId,
          },
        },
      });

      if (!existingEnrollment) {
        await prisma.enrollment.create({
          data: {
            userId: user.id,
            courseId: order.courseId,
          },
        });

        // Send confirmation email (optional)
        try {
          const { sendNotificationEmail } = await import('../../../lib/email');
          // Fetch user email and course title for email content
          const userDetails = await prisma.user.findUnique({ where: { id: user.id } });
          const courseDetails = await prisma.course.findUnique({ where: { id: order.courseId } });
          if (userDetails && courseDetails) {
            const subject = `Enrollment Confirmation for ${courseDetails.title}`;
            const message = `Dear ${userDetails.name || userDetails.email},\n\nYou have been successfully enrolled in the course "${courseDetails.title}". Enjoy learning!\n\nBest regards,\nE-Learning Platform Team`;
            await sendNotificationEmail(userDetails.email, subject, message);
          }
        } catch (emailError) {
          console.error('Error sending payment confirmation email:', emailError);
        }
      }
    }

    return res.status(200).json({ message: 'Enrollments processed' });
  } catch (error) {
    console.error('Error processing enrollments from orders:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
