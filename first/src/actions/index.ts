"use server";
import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getCustomSession } from "@/lib/session";
import * as yup from "yup";

// Validation schema
const snippetSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim(),
  code: yup
    .string()
    .required("Code is required")
    .min(10, "Code must be at least 10 characters")
    .max(10000, "Code must not exceed 10,000 characters")
    .trim(),
});

type ValidationErrors = {
  title?: string[];
  code?: string[];
  _form?: string[];
};

export async function editSnippet(id: number, code: string) {
  const session = await getCustomSession();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be signed in to edit snippets"] } };
  }

  await db
    .update(snippet)
    .set({ code })
    .where(
      and(eq(snippet.id, Number(id)), eq(snippet.userId, session.user.id))
    );

  return redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  const session = await getCustomSession();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be signed in to delete snippets"] } };
  }

  await db
    .delete(snippet)
    .where(
      and(eq(snippet.id, Number(id)), eq(snippet.userId, session.user.id))
    );

  revalidatePath("/");
  return redirect("/");
}

export async function createSnippet(
  formState: { message: string; errors?: ValidationErrors },
  formData: FormData
) {
  const session = await getCustomSession();
  if (!session || !session.user) {
    return {
      message: "Authentication required",
      errors: { _form: ["You must be signed in to create snippets"] },
    };
  }

  // Extract form data
  const rawTitle = formData.get("title");
  const rawCode = formData.get("code");

  // Convert to strings and handle null values
  const formValues = {
    title: typeof rawTitle === "string" ? rawTitle : "",
    code: typeof rawCode === "string" ? rawCode : "",
  };

  try {
    // Validate using Yup
    const validatedData = await snippetSchema.validate(formValues, {
      abortEarly: false,
    });

    // Create snippet in database
    await db.insert(snippet).values({
      title: validatedData.title,
      code: validatedData.code,
      userId: session.user.id,
    });

    revalidatePath("/snippets/all-snips");
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      const errors: ValidationErrors = {};

      error.inner.forEach((err) => {
        if (err.path) {
          const field = err.path as keyof ValidationErrors;
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field]?.push(err.message);
        }
      });

      return {
        message: "Please fix the validation errors below",
        errors,
      };
    }

    // Handle database or other errors
    console.error("Error creating snippet:", error);

    return {
      message: "Failed to create snippet. Please try again.",
      errors: {
        _form: [
          error instanceof Error ? error.message : "Something went wrong",
        ],
      },
    };
  }

  redirect("/snippets/all-snips");
}
