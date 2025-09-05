import PostCreateForm from "@/components/posts/post-create-form";
import React from "react";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";
import Link from "next/link";

export default async function TopicShowPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  
  return (
    <div className="container mx-auto px-10 py-24 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground capitalize">#{slug}</h1>
          <p className="text-muted-foreground mt-1">Discussions and posts related to this topic</p>
        </div>
        <Link 
          href="/" 
          className="text-sm text-primary hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">Posts</h2>
            </div>
            <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Create Post</h2>
            <PostCreateForm slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
