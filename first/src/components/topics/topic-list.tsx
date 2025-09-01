import Link from "next/link";
import { db } from "@/db/db";
import { Badge } from "@/components/ui/badge";
import paths from "@/path";

export default async function TopicList() {
  const topicsResult = await db.query.topics.findMany({});
  const renderedTopics = topicsResult.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <Badge variant={"default"} >
            {topic.slug}
          </Badge>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row gap-2 flex-wrap">{renderedTopics}</div>;
}
