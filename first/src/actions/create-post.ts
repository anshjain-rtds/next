"use server";
import { z } from "zod";
import { posts } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db/db";
import paths from "@/path";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
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
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!result.success) {
    return {
      errors: {
        ...result.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["you must be signed in to do this"],
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
        title: result.data.title,
        content: result.data.content,
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
  redirect(paths.postShow(slug,post.id));
}
