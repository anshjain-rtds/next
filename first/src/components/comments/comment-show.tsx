import Image from "next/image";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { CommentWithAuthor } from "@/db/queries/comments";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentShowProps {
  commentId: string;
  // comments: CommentWithAuthor[];
  postId: string;
}

export default async function CommentShow({ commentId , postId}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comments) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} postId={postId} />
    );
  });

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex gap-3">
        {comment?.user.image ? (
          <Image
            src={comment?.user.image}
            alt="user image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-sm font-medium text-foreground">
              {comment?.user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground">
              {comment?.user.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment?.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <p className="text-foreground mb-3">{comment?.content}</p>
          <CommentCreateForm postId={comment?.postId} parentId={comment?.id} />
        </div>
      </div>
      {renderedChildren.length > 0 && (
        <div className="mt-4 space-y-4 pl-4 border-l-2 border-border">
          {renderedChildren}
        </div>
      )}
    </div>
  );
}
