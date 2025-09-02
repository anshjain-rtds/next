import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";


interface PostShowProps {
  postId: string
}

export default async function PostShow({postId}: PostShowProps) {
  const resPost = await db.query.posts.findFirst({
    where: eq(posts.id, postId)
  })
  if(!resPost){
    notFound();
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{resPost.title}</h1>
      <p className="p-4 border rounded">{resPost.content}</p>
    </div>
  );
}
