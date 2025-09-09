import { comments, posts } from "@/db/schema";
import { db } from "@/db/db";
import { count, desc, eq } from "drizzle-orm";

export type PostWithData = typeof posts.$inferSelect & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

type RawPost = typeof posts.$inferSelect & {
  topic: { slug: string } | null;
  user: { name: string | null; image?: string | null } | null;
  comments: { id: string }[];
};


export async function fetchPostsByTopicSlug(
  slug: string
): Promise<PostWithData[]> {
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
        columns: { slug: true },
      },
      user: {
        columns: { name: true },
      },
      comments: true, // fetch all comments to count them
    },
  }) as RawPost[];

  // Transform to match Prisma structure
  return rawPosts.map((post) => ({
    ...post,
    topic: { slug: post.topic?.slug || "" },
    user: { name: post.user?.name || null },
    _count: { comments: post.comments?.length || 0 },
    comments: undefined,
  })) as PostWithData[];
}

export async function fetchTopPosts(): Promise<PostWithData[]> {
  // First, get posts with comment counts using proper Drizzle syntax
  const postsWithCounts = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      userId: posts.userId,
      topicId: posts.topicId,
      commentCount: count(comments.id),
    })
    .from(posts)
    .leftJoin(comments, eq(posts.id, comments.postId))
    .groupBy(
      posts.id,
      posts.title,
      posts.content,
      posts.createdAt,
      posts.updatedAt,
      posts.userId,
      posts.topicId
    )
    .orderBy(desc(count(comments.id)))
    .limit(5);

  if (postsWithCounts.length === 0) {
    return [];
  }

  // Get the post IDs from the results
  const topPostIds = postsWithCounts.map((p) => p.id);

  // Fetch the full relational data for these posts
  const rawPosts = await db.query.posts.findMany({
    where: (posts, { inArray }) => inArray(posts.id, topPostIds),
    with: {
      topic: {
        columns: { slug: true },
      },
      user: {
        columns: { name: true },
      },
      comments: true,
    },
  }) as RawPost[];

  // Create a map for comment counts and preserve order
  const countMap = new Map(postsWithCounts.map((p) => [p.id, p.commentCount]));

  // Sort the posts by comment count (descending) and transform
  return rawPosts
    .sort((a, b) => (countMap.get(b.id) || 0) - (countMap.get(a.id) || 0))
    .map((post) => ({
      ...post,
      topic: { slug: post.topic?.slug || "" },
      user: { name: post.user?.name || null },
      _count: { comments: countMap.get(post.id) || 0 },
      comments: undefined,
    })) as PostWithData[];
}

export async function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
  const rawPosts = await db.query.posts.findMany({
    where: (posts, { or, like }) => or(
      like(posts.title, `%${term}%`),
      like(posts.content, `%${term}%`)
    ),
    with: {
      topic: { 
        columns: { slug: true } 
      },
      user: { 
        columns: { name: true, image: true } 
      },
      comments: true, // Fetch all comments to count them
    },
  }) as RawPost[];

  // Transform to match expected structure
  return rawPosts.map((post) => ({
    ...post,
    topic: { slug: post.topic?.slug || "" },
    user: { name: post.user?.name || null },
    _count: { comments: post.comments?.length || 0 },
    comments: undefined,
  })) as PostWithData[];
}