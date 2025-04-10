import 'next-auth';
import 'next-auth/jwt';
import { Role } from '@prisma/client'; // Your Prisma enum for roles

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    role: Role;
    image?: string | null;
    bio?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      emailVerified?: Date | null;
      role: Role;
      image?: string | null;
      bio?: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    role: Role;
    image?: string | null;
    bio?: string | null;
  }
}
