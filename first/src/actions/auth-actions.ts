/* eslint-disable @typescript-eslint/no-explicit-any */
// app/lib/auth-actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as yup from "yup";

const NESTJS_API_URL = process.env.NESTJS_API_URL;

export type AuthFormState =
  | { error: string; fieldErrors?: Record<string, string[]> }
  | { success: boolean; error?: undefined; fieldErrors?: undefined }
  | { error: any; fieldErrors?: undefined; success?: undefined }


// Yup schemas
const signInSchema = yup.object({
  username: yup.string().required("username is required").min(4).max(20),
  password: yup
    .string()
    .min(8, "Password must be at least 6 characters")
    .required("Password is required")
    .max(32),
});

const signUpSchema = yup.object({
  username: yup.string().required("username is required").min(4).max(20),
  password: yup
    .string()
    .min(8, "Password must be at least 6 characters")
    .required("Password is required")
    .max(32)
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message: "password is too weak"}),
});

export async function signInAction(state:AuthFormState,formData: FormData) : Promise<AuthFormState>{
  console.log(formData)

  try {
    const validatedData = await signInSchema.validate(
      {
        username: formData.get("username"),
        password: formData.get("password"),
      },
      { abortEarly: false }
    );

    const response = await fetch(`${NESTJS_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });
    console.log(response)
    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Sign in failed" };
    }

    const cookieStore = await cookies();
    cookieStore.set("nest-auth-token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect('/');
    
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

    // console.error("Sign in error:", error);
    return { error: "Network error. Please try again." };
  }
}

export async function signUpAction(state:AuthFormState,formData: FormData) :Promise<AuthFormState>{
  console.log(formData)
  try {
    const validatedData = await signUpSchema.validate(
      {
        username: formData.get("username"),
        password: formData.get("password"),
      },
      { abortEarly: false }
    );

    const response = await fetch(`${NESTJS_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });
    console.log(response)
    if (!response.ok) {
      return { error: Response.status || "Sign up failed" };
    }
    
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

    console.error("Sign up error:", error);
    return { error: "Network error. Please try again." };
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("nest-auth-token");
  redirect("/auth");
}