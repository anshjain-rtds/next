// lib/session.ts
import { cookies } from "next/headers";
import { auth } from "@/auth"; 
export interface CustomUser {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  image?: string;
  authType: "github" | "credentials";
}

export interface CustomSession {
  user: CustomUser;
  expires?: string;
}

export async function getCustomSession(): Promise<CustomSession | null> {
  // First check for NextAuth session (GitHub)
  const nextAuthSession = await auth();

  if (nextAuthSession?.user) {
    return {
      user: {
        id: nextAuthSession.user.id || "",
        email: nextAuthSession.user.email || "",
        name: nextAuthSession.user.name || "",
        image: nextAuthSession.user.image || "",
        authType: "github",
      },
      expires: nextAuthSession.expires,
    };
  }

  // Then check for NestJS credentials session
  const cookieStore = await cookies();
  const nestToken = cookieStore.get("nest-auth-token");

  if (!nestToken) {
    return null;
  }

  try {
    const NESTJS_API_URL = process.env.NESTJS_API_URL;
    const response = await fetch(`${NESTJS_API_URL}/auth/test`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${nestToken.value}`,
      },
    });

    if (!response.ok) {
      // Token invalid, clear it
      cookieStore.delete("nest-auth-token");
      return null;
    }

    const userData = await response.json();

    return {
      user: {
        id: userData.id || userData.sub,
        username: userData.username,
        authType: "credentials",
      },
    };
  } catch (error) {
    console.error("Error validating NestJS token:", error);
    cookieStore.delete("nest-auth-token");
    return null;
  }
}

// Server component hook
export async function getCurrentUser(): Promise<CustomUser | null> {
  const session = await getCustomSession();
  return session?.user || null;
}
