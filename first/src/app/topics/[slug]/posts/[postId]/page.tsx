import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/path";
// import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Suspense } from "react";
import { LoaderFour } from "@/components/ui/loader";
// import PostShowLoading from "@/components/posts/post-show-loading";
interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="container mx-auto px-10 py-24 max-w-4xl">
      <div className="mb-6">
        <Link
          className="text-sm text-primary hover:underline flex items-center"
          href={paths.topicShow(slug)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to #{slug}
        </Link>
      </div>

      <div className="space-y-6">
        <Suspense fallback={<LoaderFour text="Loading Post..." />}>
          <PostShow postId={postId}/>

        </Suspense>
        <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Add a Comment
          </h2>
          <CommentCreateForm postId={postId} startOpen />
        </div>
        <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
          {/* <h2 className="text-xl font-bold text-foreground mb-4">Comments</h2> */}
          {/* <CommentList fetchData={()=> fetchCommentsByPostId(postId)}/> */}
          <CommentList postId={postId} />
        </div>
      </div>
    </div>
  );
}
