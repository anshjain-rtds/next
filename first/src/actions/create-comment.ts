"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db/db";
import paths from "@/path";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }
  //   let comment;
  try {
    const res = await db
      .insert(comments)
      .values({
        content: result.data.content,
        postId: postId,
        parentId: parentId ?? null,
        userId: session.user.id,
      })
      .returning();
    if (!res) {
      throw new Error("Failed to create comment");
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  // Get the topic for revalidation
  const post = await db.query.posts.findFirst({
    where: (p) => eq(p.id, postId),
    columns: { topicId: true },
  });

  if (!post?.topicId) {
    return {
      errors: {
        _form: ["Failed to find related topic"],
      },
    };
  }
  const topic = await db.query.topics.findFirst({
    where: (t) => eq(t.id, post.topicId),
    columns: { slug: true },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  revalidatePath(paths.postShow(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
