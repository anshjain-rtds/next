// app/profile/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const NESTJS_API_URL = process.env.NESTJS_API_URL || "http://localhost:3001";

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
}

interface UserProfile {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  tasks: any[];
}

async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nest-auth-token");
  
  if (!token) {
    redirect("/auth");
  }
  
  return token.value;
}

// Helper function to make authenticated API calls
async function authenticatedFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  const response = await fetch(`${NESTJS_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - please log in again");
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
}

export async function getProfile(): Promise<UserProfile> {
  try {
    return await authenticatedFetch("/auth/profile");
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
}

export async function updateProfile(
  data: UpdateProfileData
): Promise<UserProfile> {
  try {
    return await authenticatedFetch("/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
}
