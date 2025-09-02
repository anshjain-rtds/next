import CommentShow from "@/components/comments/comment-show";
import { CommentWithAuthor } from "@/db/queries/comments";

interface CommentListProps {
  fetchData: ()=> Promise<CommentWithAuthor[]>
}

export default async function CommentList({fetchData}: CommentListProps) {
  const comments = await fetchData();
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-foreground">Comments</h2>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
          {comments.length}
        </span>
      </div>
      {comments.length > 0 ? (
        <div className="space-y-6">
          {renderedComments}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-base font-medium text-foreground mb-1">No comments yet</h3>
          <p className="text-muted-foreground text-sm">Be the first to share your thoughts</p>
        </div>
      )}
    </div>
  );
}
