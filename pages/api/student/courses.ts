import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId query parameter' });
    }

    const courses = await prisma.course.findMany({
      where: {
        enrollments: {
          some: {
            userId: userId,
          },
        },
        instructor: {
          deletedAt: null,
        },
      },
      include: {
        instructor: true,
      },
    });

    const enrichedCourses = courses.map(course => ({
      ...course,
      progress: 0, // Progress is tracked separately in Progress model
      isEnrolled: true,
    }));

    res.status(200).json(enrichedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  } else if (req.method === 'POST') {
    try {
      const { courseId, userId } = req.body;
      
      // The model name here should match your Prisma schema
      // Common alternatives: userCourse, courseEnrollment, studentCourse
      const enrollment = await prisma.enrollment.create({
        data: {
          courseId,
          userId,
          enrolledAt: new Date(),
        },
      });

      res.status(201).json(enrollment);
    } catch (error) {
      console.error('Error creating enrollment:', error);
      res.status(500).json({ error: 'Failed to enroll in course' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}