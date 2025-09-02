import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/path";
import { fetchCommentsByPostId } from "@/db/queries/comments";
interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3 py-24 px-10">
      <Link className="font-semibold text-lg decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <PostShow postId={postId}/> 
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchData={()=> fetchCommentsByPostId(postId)}/>
    </div>
  );
}
