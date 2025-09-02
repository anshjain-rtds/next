import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";


interface PostShowProps {
  postId: string
}

export default async function PostShow({postId}: PostShowProps) {
  await new Promise((resolve)=>setTimeout(resolve,2500))
  const resPost = await db.query.posts.findFirst({
    where: eq(posts.id, postId)
  })
  if(!resPost){
    notFound();
  }
  return (
    <div className="bg-card rounded-xl shadow-lg border  border-border overflow-hidden">
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <h1 className="text-2xl font-bold text-foreground">{resPost.title}</h1>
      </div>
      <div className="p-6">
        <p className="text-foreground whitespace-pre-wrap">{resPost.content}</p>
      </div>
    </div>
  );
}
