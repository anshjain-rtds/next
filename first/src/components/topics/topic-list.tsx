import Link from "next/link";
import { db } from "@/db/db";
import { Badge } from "@/components/ui/badge";
import paths from "@/path";

export default async function TopicList() {
  const topicsResult = await db.query.topics.findMany({});
  
  if (topicsResult.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground text-sm">No topics created yet</p>
      </div>
    );
  }
  
  const renderedTopics = topicsResult.map((topic) => {
    return (
      <Link 
        key={topic.id} 
        href={paths.topicShow(topic.slug)}
        className="block"
      >
        <Badge 
          variant="default" 
          className="px-3 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
        >
          #{topic.slug}
        </Badge>
      </Link>
    );
  });

  return (
    <div className="flex flex-wrap gap-2 px-2 py-4">
      {renderedTopics}
    </div>
  );
}
