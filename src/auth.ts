import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import prisma from "./lib/prisma"
import { Adapter } from "next-auth/adapters"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  providers: [GitHub, Google ],
  callbacks: {
    async signIn({user}){
      return true
    },
    async jwt({token,user, account, profile}){
      const dbUser = await prisma.user.findUnique({
        where: {email: token.email  ?? 'no-email'}});

      token.roles = dbUser?.roles ?? [];
      token.id = dbUser?.id ?? '';
      return token;
    },
    async session({session, token, user}){
      if ( session && session.user ) {
        session.user.roles= token.roles as string[];
        session.user.id = token.id as string

      }
      console.log({session});
      
      return session;
    }

  }
})