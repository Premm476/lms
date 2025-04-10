import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

type UserResponse = {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  emailVerified?: Date | null;
  avatar?: string | null;
  bio?: string | null;
  lastAccessedAt?: Date | null;
};

type ErrorResponse = {
  error: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | ErrorResponse>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      avatar: user.image,
      bio: user.bio,
      lastAccessedAt: user.updatedAt,
    });
  } catch (error) {
    const err = error as Error;
    console.error('[USER API ERROR]', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
