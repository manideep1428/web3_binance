// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
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
    async signIn({ account, user }) {
      if (!user.email) {
        return false; // Instead of throwing an error, return false to prevent sign in
      }
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email
        }
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image
          }
        });
      }
      return true;
    },
    async authorize({ user, account, profile }) {
      console.log(user);
      console.log(account);
      console.log(profile);
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        //@ts-ignore
        session.user.id = token.sub;
      }
      console.log(session);
      console.log(token);
      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn',
  },
});

export { handler as GET, handler as POST }