import type { User as PrismaUser } from "@prisma/client";

/** 
 * Application user roles (intentionally defined for type safety)
 * @enum {string}
 * @property {string} STUDENT - Standard student role
 * @property {string} INSTRUCTOR - Course instructor role 
 * @property {string} ADMIN - System administrator role
 */
 
 
/** 
 * Application user roles used for type safety
 * @enum {string}
 */
 
export enum Role {
  /** Used throughout the application for student role authorization */
  STUDENT = 'STUDENT',
  /** Used throughout the application for instructor role authorization */ 
  INSTRUCTOR = 'INSTRUCTOR',
  /** Used throughout the application for admin role authorization */
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
