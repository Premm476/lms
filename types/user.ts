import type { User as PrismaUser } from "@prisma/client";

export enum Role {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface User extends Omit<PrismaUser, 'password' | 'name' | 'emailVerified'> {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | boolean | null;
  role: Role;
  agreedToTerms: boolean;
  image: string | null;
  bio: string | null;
  verificationToken: string | null;
  resetToken: string | null;
  resetTokenExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
