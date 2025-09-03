import Link from "next/link";
import paths from "@/path";
// import { posts, users, topics } from "@/db/schema";
import type { PostWithData } from "@/db/queries/posts";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const postsData = await fetchData();
  // console.log(postsData)
  if (postsData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
        <p className="text-muted-foreground">Be the first to create a post in this topic</p>
      </div>
    );
  }
  
  const renderedPosts = postsData.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <Link 
        key={post.id} 
        href={paths.postShow(topicSlug, post.id)}
        className="block bg-background rounded-lg border border-border p-4 hover:shadow-md transition-all duration-200"
      >
        <h3 className="text-lg font-bold text-foreground mb-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-xs font-medium text-foreground">
                {post.user.name!.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{post.user.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post._count.comments}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </Link>
    );
  });

  return <div className="space-y-4 ">{renderedPosts}</div>;
}
