import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    console.log('Create order request body:', req.body);
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { courseId, paymentMethod, amount } = req.body;

    if (!courseId || !paymentMethod || !amount) {
      console.error('Missing required fields:', req.body);
      return res.status(400).json({ message: 'Missing required fields: courseId, paymentMethod, amount' });
    }

    // Resolve courseId if it is a slug (not a valid cuid)
    let resolvedCourseId = courseId;
    const cuidRegex = /^[a-z0-9]{25,}$/; // simple check for cuid format
    if (!cuidRegex.test(courseId)) {
      const course = await prisma.course.findFirst({
        where: { title: courseId }, // Assuming courseId is title slug, adjust if needed
        select: { id: true },
      });
      if (!course) {
        return res.status(400).json({ message: `Invalid courseId: ${courseId}` });
      }
      resolvedCourseId = course.id;
    }

    // Create order in database
    const createdOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        courseId: resolvedCourseId,
        paymentMethod,
        amount,
        status: 'pending', // initial status
      },
    });

    return res.status(201).json({ order: createdOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
