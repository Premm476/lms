import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../../lib/prisma';
import { Role } from '../../../types/user';
import { sendWelcomeEmail } from '../../../lib/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST'])
              .status(405)
              .json({ message: 'Method not allowed' });
  }

  const { name, email, password, role = 'STUDENT' } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ 
      message: 'Missing required fields: name, email, or password' 
    });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({ 
      message: 'Password must be at least 8 characters long' 
    });
  }

  try {
    // Check if user already exists (case-insensitive)
    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email.toLowerCase()
        }
      }
    });

    if (existingUser) {
      return res.status(409).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);
    
    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role as Role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name || '');
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    return res.status(201).json({ 
      success: true,
      user,
      message: 'Registration successful. Please login.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: 'Internal server error during registration' 
    });
  }
}
