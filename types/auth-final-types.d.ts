import 'next-auth'
import 'next-auth/jwt'
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    name?: string | null
    email: string
    role: Role
    image?: string | null
    emailVerified?: Date | null
    password?: string | null
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email: string
      role: Role
      image?: string | null
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    name?: string | null
    email: string
    role: Role
    image?: string | null
  }
}
