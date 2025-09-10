/* eslint-disable @typescript-eslint/no-explicit-any */
// actions/task-actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as yup from "yup";
import { TaskStatus } from "@/lib/types/task";

const NESTJS_API_URL = process.env.NESTJS_API_URL;

// Yup schemas
const createTaskSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
});

const updateTaskSchema = yup.object({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .optional(),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  status: yup
    .string()
    .oneOf(Object.values(TaskStatus), "Invalid status")
    .optional(),
});

const updateStatusSchema = yup.object({
  status: yup
    .string()
    .oneOf(Object.values(TaskStatus), "Invalid status")
    .required("Status is required"),
});

// Helper function to get auth token
async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nest-auth-token");
  
  if (!token) {
    redirect("/auth");
  }
  
  return token.value;
}

// Helper function to make authenticated requests
async function makeAuthenticatedRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = await getAuthToken();
  
  const response = await fetch(`${NESTJS_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    redirect("/auth");
  }

  return response;
}

// Create Task Action
export async function createTaskAction(formState: any, formData: FormData) {
  try {
    const validatedData = await createTaskSchema.validate(
      {
        title: formData.get("title"),
        description: formData.get("description"),
      },
      { abortEarly: false }
    );

    const response = await makeAuthenticatedRequest("/tasks", {
      method: "POST",
      body: JSON.stringify(validatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to create task" };
    }

    revalidatePath("/tasks");
    
} catch (error: any) {
    if (error.name === "ValidationError") {
        const fieldErrors: Record<string, string[]> = {};
        error.inner.forEach((err: any) => {
            if (err.path) {
                if (!fieldErrors[err.path]) fieldErrors[err.path] = [];
                fieldErrors[err.path].push(err.message);
            }
        });
        return { error: "Invalid form data", fieldErrors };
    }
    
    console.error("Create task error:", error);
    return { error: "Network error. Please try again." };
}
redirect("/tasks");
}

// Update Task Action
export async function updateTaskAction(
  taskId: string,
  formState: any,
  formData: FormData
) {
  try {
    const updateData: any = {};
    
    const title = formData.get("title");
    const description = formData.get("description");
    const status = formData.get("status");
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;

    const validatedData = await updateTaskSchema.validate(updateData, {
      abortEarly: false,
    });

    // If only status is being updated, use the status endpoint
    if (Object.keys(validatedData).length === 1 && validatedData.status) {
      const response = await makeAuthenticatedRequest(
        `/tasks/${taskId}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: validatedData.status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || "Failed to update task status" };
      }
    } else {
      // For other updates, we'd need a general update endpoint
      // Since your controller doesn't have one, let's assume it exists
      const response = await makeAuthenticatedRequest(`/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || "Failed to update task" };
      }
    }

    revalidatePath("/tasks");
    revalidatePath(`/tasks/${taskId}`);
    return { success: true };
    
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const fieldErrors: Record<string, string[]> = {};
      error.inner.forEach((err: any) => {
        if (err.path) {
          if (!fieldErrors[err.path]) fieldErrors[err.path] = [];
          fieldErrors[err.path].push(err.message);
        }
      });
      return { error: "Invalid form data", fieldErrors };
    }

    console.error("Update task error:", error);
    return { error: "Network error. Please try again." };
  }
}

// Update Task Status Action (Quick status change)
export async function updateTaskStatusAction(taskId: string, status: TaskStatus) {
  try {
    const validatedData = await updateStatusSchema.validate({ status });

    const response = await makeAuthenticatedRequest(`/tasks/${taskId}/status`, {
      method: "PATCH",
      body: JSON.stringify(validatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to update task status" };
    }

    revalidatePath("/tasks");
    revalidatePath(`/tasks/${taskId}`);
    return { success: true, task: data };
    
  } catch (error: any) {
    console.error("Update task status error:", error);
    return { error: "Network error. Please try again." };
  }
}

// Delete Task Action
export async function deleteTaskAction(taskId: string) {
  try {
    const response = await makeAuthenticatedRequest(`/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || "Failed to delete task" };
    }

    revalidatePath("/tasks");
    return { success: true };
    
  } catch (error: any) {
    console.error("Delete task error:", error);
    return { error: "Network error. Please try again." };
  }
}

// Fetch Tasks
export async function fetchTasks(filters?: { status?: TaskStatus; search?: string }) {
  try {
    let queryParams = "";
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.search) params.append("search", filters.search);
      queryParams = params.toString() ? `?${params.toString()}` : "";
    }

    const response = await makeAuthenticatedRequest(`/tasks${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await response.json();
    return { success: true, tasks };
    
  } catch (error: any) {
    console.error("Fetch tasks error:", error);
    return { error: "Failed to fetch tasks" };
  }
}

// Fetch Single Task
export async function fetchTaskById(taskId: string) {
  try {
    const response = await makeAuthenticatedRequest(`/tasks/${taskId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }

    const task = await response.json();
    return { success: true, task };
    
  } catch (error: any) {
    console.error("Fetch task error:", error);
    return { error: "Failed to fetch task" };
  }
}