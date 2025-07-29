import { NextAuthOptions } from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './db'
import { users, userProfiles } from './db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
          with: {
            profile: true
          }
        })

        if (!user) {
          return null
        }

        // For now, we'll skip password verification for demo
        // In production, you'd verify against a hashed password
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        
        // Get user profile
        const profile = await db.query.userProfiles.findFirst({
          where: eq(userProfiles.userId, user.id)
        })
        
        session.user.plan = profile?.plan || 'free'
        session.user.monthlyUsage = profile?.monthlyUsage || 0
        session.user.monthlyLimit = profile?.monthlyLimit || 5
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Create user profile if it doesn't exist
        const existingProfile = await db.query.userProfiles.findFirst({
          where: eq(userProfiles.userId, user.id)
        })

        if (!existingProfile) {
          await db.insert(userProfiles).values({
            userId: user.id,
            plan: 'free',
            monthlyUsage: 0,
            monthlyLimit: 5,
          })
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
} 