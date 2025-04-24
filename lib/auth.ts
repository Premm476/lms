const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

// Remove error throw for missing Google OAuth environment variables
// if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
//   throw new Error("Missing Google OAuth environment variables: GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET")
// }

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GitHub OAuth environment variables: GITHUB_CLIENT_ID and/or GITHUB_CLIENT_SECRET")
}

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import prisma from "./prisma"
import type { Role } from "@prisma/client"

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null

      const user = await prisma.user.findUnique({
        where: { email: credentials.email }
      })

      if (!user || !user.password) return null

      const isValid = await compare(credentials.password, user.password)
      if (!isValid) return null

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        emailVerified: user.emailVerified
      }
    }
  }),
]

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  providers.push(GoogleProvider({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  }) as any)
}

providers.push(GitHubProvider({
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
}) as any)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.image = token.image as string | null
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  cookies: process.env.NODE_ENV === "production" ? undefined : {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
}
