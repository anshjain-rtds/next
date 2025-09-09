/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/db";
import { cookies } from "next/headers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  callbacks: {
    async session({ session, user }: any) {
      console.log("hello")
      if (session && user) {
        session.user.id = user.id;
        return session;
      }

      const cookieStore =await cookies()
      const nestToken = cookieStore.get('nest-auth-token')
      const nestUser = cookieStore.get('nest-user-data')
      console.log(nestToken,nestUser)
      if (nestToken && nestUser) {
        // Merge both auth methods
        session.nestAuth = {
          token: nestToken.value,
          user: JSON.parse(nestUser.value)
        }
      }
      
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        
        return true;
        
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
      
    },
  },
  events: {
    async linkAccount({ user, account, profile }) {
      console.log("Account linked:", { user: user.email, provider: account.provider, profile });
    },
  },
  logger: {
    error(code, ...metadata) {
      console.error(`Auth Error [${code}]:`, metadata);
      
    },
    warn(code) {
      console.warn(`Auth Warning [${code}]`);
    },
  },
  pages: {
    signIn: '/auth'
  }
});
