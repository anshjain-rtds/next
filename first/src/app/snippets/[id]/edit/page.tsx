import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const { id } = await props.params;
  const parsedId = parseInt(id);

  const snip = await db.query.snippet.findFirst({
    where: eq(snippet.id, Number(parsedId)),
  });

  if (!snip) {
    return notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto px-10 py-24">
      <h1 className="text-2xl font-bold mb-4">Edit Snippet</h1>
      <div className="rounded-xl bg-gray-900 shadow-lg p-4">
        <SnippetEditForm snippet={snip} />
      </div>
    </div>
  );
}
