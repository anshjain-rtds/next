/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/db";

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
      // This callback runs before the user is saved to the database
      // Return true to allow sign in, false to deny
      return true;
    },
  },
  events: {
    async linkAccount({ user, account, profile }) {
      console.log("Account linked:", { user: user.email, provider: account.provider, profile });
    },
  },
});
