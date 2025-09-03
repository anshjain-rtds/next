/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/db";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";

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
      if (session && user) {
        session.user.id = user.id;
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
  }
});
