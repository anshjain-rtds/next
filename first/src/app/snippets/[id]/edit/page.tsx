import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";
interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const { id } = await props.params;
  const parsedId = parseInt(id);
  const snip = await db.query.snippet.findFirst({
    where: eq(snippet.id, Number(parsedId)),
  });
  if (!snip) return notFound();
  return <div>
    <SnippetEditForm snippet={snip}/>
  </div>;
}
