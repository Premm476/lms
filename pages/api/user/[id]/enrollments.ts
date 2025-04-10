import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const userId = req.query.id as string

  if (session.user.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            instructor: true,
            modules: {
              include: {
                lessons: true
              }
            }
          }
        }
      },
      orderBy: {
        enrolledAt: 'desc'
      }
    })

    return res.status(200).json({ enrollments })
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}