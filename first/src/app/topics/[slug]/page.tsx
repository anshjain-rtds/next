import PostCreateForm from "@/components/posts/post-create-form";
import React from "react";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";
export default async function TopicShowPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4 py-24">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
