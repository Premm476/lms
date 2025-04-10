// pages/api/courses/[id]/enroll.ts
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';

interface SessionUser {
  id: string;
  // Add other user properties you need
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  const user = session?.user as SessionUser;

  if (!user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id: courseId } = req.query;

  if (typeof courseId !== 'string') {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: courseId
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    // Create enrollment - Omit progress since it has a default value
    await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
        enrolledAt: new Date()
        // Don't include progress here - it will use the default value of 0
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Enrollment error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
