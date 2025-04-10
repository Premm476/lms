import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;

    const course = await prisma.course.findUnique({
      where: {
        id: id as string
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true
          }
        },
        modules: {
          include: {
            lessons: true
          }
        },
        enrollments: userId ? {
          where: {
            userId
          },
          take: 1
        } : false,
        discussions: {
          take: 5,
          include: {
            user: {
              select: {
                name: true,
                image: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollmentCount = await prisma.enrollment.count({
      where: {
        courseId: course.id
      }
    });

    const discussionCount = await prisma.discussion.count({
      where: {
        courseId: course.id
      }
    });

    const isEnrolled = course.enrollments && course.enrollments.length > 0;
    const enrollment = isEnrolled ? course.enrollments[0] : null;

    const response = {
      ...course,
      enrollmentCount,
      discussionCount,
      isEnrolled,
      enrollment
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching course:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
