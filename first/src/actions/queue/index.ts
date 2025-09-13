"use server";

import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/session";
const NESTJS_API_URL = process.env.NESTJS_API_URL;

export interface QueueStatus {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  queueStatus?: QueueStatus;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  jobId?: string;
  jobIds?: string[];
  queueStatus?: QueueStatus;
}

// Helper function to make authenticated API calls
async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("nest-auth-token");
  if (!token) {
    throw new Error("Unauthorized - auth token not found");
  }

  const response = await fetch(`${NESTJS_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
      ...options.headers,
    },
    cache: "no-store",
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

// Server action to get queue status
export async function getQueueStatus(): Promise<ApiResponse> {
  try {
    // We still need to ensure user is authenticated before performing action.
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    return await authenticatedFetch("/queue/status", {
      method: "GET",
    });
  } catch (error) {
    console.error("Queue status fetch error:", error);
    return {
      success: false,
      message: "Failed to fetch queue status",
    };
  }
}

// Server action to add a job
export async function addJobAction(message: string): Promise<ApiResponse> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    return await authenticatedFetch("/queue/add-job", {
      method: "POST",
      body: JSON.stringify({ message, userId: user.id }),
    });
  } catch (error) {
    console.error("Add job error:", error);
    return {
      success: false,
      message: "Failed to add job",
    };
  }
}

// Server action to add delayed job
export async function addDelayedJobAction(
  message: string,
  delay: number
): Promise<ApiResponse> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    return await authenticatedFetch("/queue/add-delayed-job", {
      method: "POST",
      body: JSON.stringify({ message, delay, userId: user.id }),
    });
  } catch (error) {
    console.error("Add delayed job error:", error);
    return {
      success: false,
      message: "Failed to add delayed job",
    };
  }
}

// Server action to add bulk jobs
export async function addBulkJobsAction(count: number): Promise<ApiResponse> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    return await authenticatedFetch(
      `/queue/add-bulk-jobs?count=${count}`,
      {
        method: "POST",
        body: JSON.stringify({ userId: user.id }),
      }
    );
  } catch (error) {
    console.error("Add bulk jobs error:", error);
    return {
      success: false,
      message: "Failed to add bulk jobs",
    };
  }
}

// Server action to clear queue
export async function clearQueueAction(): Promise<ApiResponse> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("User not authenticated");
    }
    return await authenticatedFetch("/queue/clear", {
      method: "POST",
      body: JSON.stringify({ userId: user.id }),
    });
  } catch (error) {
    console.error("Clear queue error:", error);
    return {
      success: false,
      message: "Failed to clear queue",
    };
  }
}
