import { posts  } from "@/db/schema";
import { db } from "@/db/db";

export type PostWithData = typeof posts.$inferSelect & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};



export async function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  const topic = await db.query.topics.findFirst({
    where: (topics, { eq }) => eq(topics.slug, slug),
    columns: { id: true, slug: true },
  });

  if (!topic) {
    return [];
  }

  const rawPosts = await db.query.posts.findMany({
    where: (posts, { eq }) => eq(posts.topicId, topic.id),
    with: {
      topic: { 
        columns: { slug: true } 
      },
      user: { 
        columns: { name: true } 
      },
      comments: true, // fetch all comments to count them
    },
  });

  // Transform to match Prisma structure
  return rawPosts.map((post) => ({
    ...post,
    topic: { slug: post.topic?.slug || '' },
    user: { name: post.user?.name || null },
    _count: { comments: post.comments?.length || 0 },
    comments: undefined,
  })) as PostWithData[];
}