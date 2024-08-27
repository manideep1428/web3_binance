// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/db"

const handler = NextAuth({
  session:{
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile){
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      }
    }),
  ],
  callbacks: {
    async signIn({account , user }){
      if(!user.email){
        throw new Error("Email is required")
      }
      const isUser = prisma.user.upsert({
        select: {
          //@ts-ignore
           email: user.email ,
           },
        create:{
          email: user.email,
          name: user.name,
          image: user.image,
        },
        update:{
          name: user.name,
          image: user.image,
        }
      })
      return true 
    },
      async session({ session, token, user }) {
        session.user.id = token.sub
        return session
      },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
})

export { handler as GET, handler as POST }