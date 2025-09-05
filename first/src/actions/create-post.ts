"use server";
import { z } from "zod";
import { posts } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db/db";
import paths from "@/path";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import * as yup from "yup";
const createPostSchema = yup.object({
  title: yup.string().min(5, "Title must be at least 5 characters long").required("Title is required"),
  content: yup.string().min(10, "Content must be at least 10 characters long").required("Content is required"),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  try {
    const validatedData = await createPostSchema.validate({
      title: formData.get("title"),
      content: formData.get("content"),
    }, { abortEarly: false });

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return {
        errors: {
          _form: ["You must be signed in to do this"],
        },
      };
    }

    const topic = await db.query.topics.findFirst({
      where: (t) => eq(t.slug, slug),
    });
    
    if (!topic) {
      return {
        errors: {
          _form: ["Topic not found"],
        },
      };
    }

    let post;
    try {
      const res = await db
        .insert(posts)
        .values({
          title: validatedData.title,
          content: validatedData.content,
          userId: session.user.id,
          topicId: topic.id,
        })
        .returning();
      post = res[0];
    } catch (err: unknown) {
      if (err instanceof Error) {
        return {
          errors: {
            _form: [err.message],
          },
        };
      } else {
        return {
          errors: {
            _form: ["An error occurred while creating the post"],
          },
        };
      }
    }

    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));

  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: { [key: string]: string[] } = {};
      
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = errors[err.path] ? [...errors[err.path], err.message] : [err.message];
        }
      });

      return {
        errors: {
          ...errors,
          _form: [],
        } as CreatePostFormState['errors'],
      };
    }

    return {
      errors: {
        _form: ["An unexpected error occurred"],
      },
    };
  }
}