import { comments } from "../schema";

import { db } from "../db";
import { eq } from "drizzle-orm";

export type CommentWithAuthor = typeof comments.$inferSelect & {
  user: { name: string | null; image: string | null };
};

export async function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  const rawComments = await db.query.comments.findMany({
    where: eq(comments.postId, postId),
    with: {
      user: {
        columns: { name: true, image: true },
      },
    },
  });

  return rawComments.map((comment) => ({
    ...comment,
    user: {
      name: comment.user?.name || null,
      image: comment.user?.image || null,
    },
  })) as CommentWithAuthor[];
  
}
