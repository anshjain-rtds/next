import Link from "next/link";
import { db } from "@/db/db";
import paths from "@/path";

export default async function TopicsPage() {
  const topics = await db.query.topics.findMany({
    with: {
      posts: true
    }
  });
  
  const renderedTopics = topics.map((topic) => {
    return (
      <Link
        key={topic.id}
        href={paths.topicShow(topic.slug)}
        className="block bg-card rounded-xl shadow-sm border border-border p-5 hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">#{topic.slug}</h3>
            {topic.description && (
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                {topic.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
              {topic.posts.length} posts
            </span>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="container mx-auto px-10 py-24 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Topics</h1>
          <p className="text-muted-foreground mt-1">Browse discussion topics</p>
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
      
      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        {topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderedTopics}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No topics yet</h3>
            <p className="text-muted-foreground mb-4">Create your first topic to start a discussion</p>
          </div>
        )}
      </div>
    </div>
  );
}