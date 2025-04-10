import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Get all enrollments with course details for the user
      const enrollments = await prisma.enrollment.findMany({
        where: {
          userId: userId,
        },
        include: {
          course: true,
        },
      });

      // Calculate overall progress by checking user progress records
      const courseProgress = await Promise.all(enrollments.map(async e => {
        // Get all lessons in course to calculate progress
        const courseLessonIds = await prisma.lesson.findMany({
          where: { module: { courseId: e.courseId } },
          select: { id: true }
        });

        const totalLessons = courseLessonIds.length;
        const completedLessons = await prisma.progress.count({
          where: {
            userId: e.userId,
            lessonId: { in: courseLessonIds.map(l => l.id) },
            completed: true
          }
        });
        return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      }));

      const totalCourses = enrollments.length;
      const completedCourses = courseProgress.filter(p => p === 100).length;
      const inProgressCourses = courseProgress.filter(p => p > 0 && p < 100).length;
      const averageProgress = courseProgress.reduce((sum, p) => sum + p, 0) / totalCourses || 0;

      // Get recent activity by joining with lesson and course tables
      const recentActivity = await prisma.progress.findMany({
        where: {
          userId,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: 5,
        select: {
          id: true,
          completed: true,
          updatedAt: true,
          lesson: {
            select: {
              title: true,
              module: {
                select: {
                  course: {
                    select: {
                      title: true,
                      id: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      res.status(200).json({
        totalCourses,
        completedCourses,
        inProgressCourses,
        averageProgress,
        enrollments,
        recentActivity: recentActivity.map(activity => ({
          id: activity.id,
          type: 'PROGRESS_UPDATE',
          description: activity.completed ? 
            `Completed lesson: ${activity.lesson?.title}` : 
            `Progress on lesson: ${activity.lesson?.title}`,
          date: activity.updatedAt,
          course: activity.lesson?.module?.course,
          progress: activity.completed ? 100 : 0,
        })),
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
      res.status(500).json({ error: 'Failed to fetch progress data' });
    }
  } else if (req.method === 'POST') {
    try {
      const { userId, courseId, lessonId, completed } = req.body;

      if (!userId || !courseId || !lessonId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Update or create user progress record
      const userProgress = await prisma.progress.upsert({
        where: {
          userId_lessonId: {
            userId,
            lessonId,
          },
        },
        update: {
          completed: completed !== undefined ? completed : undefined,
          updatedAt: new Date(),
        },
        create: {
          userId,
          lessonId,
          completed: completed || false,
          updatedAt: new Date(),
        },
      });

      // Get all lessons in course to calculate progress
      const courseLessonIds = await prisma.lesson.findMany({
        where: {
          module: { courseId }
        },
        select: { id: true }
      });

      const totalLessons = courseLessonIds.length;
      const completedLessons = await prisma.progress.count({
        where: {
          userId,
          lessonId: { in: courseLessonIds.map(l => l.id) },
          completed: true
        }
      });

      // Calculate progress percentage (not stored in enrollment)
      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      res.status(200).json({
        ...userProgress,
        progressPercentage
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      res.status(500).json({ error: 'Failed to update progress' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
