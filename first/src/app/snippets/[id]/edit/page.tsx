import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";
import Link from "next/link";

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
    <div className="container mx-auto px-10 py-24 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Snippet</h1>
          <p className="text-muted-foreground mt-1">Modify your code snippet</p>
        </div>
        <Link 
          href={`/snippets/${id}`} 
          className="text-sm text-primary hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to snippet
        </Link>
      </div>
      
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="border-b border-border bg-muted/50 px-6 py-3">
          <h2 className="text-sm font-medium text-foreground">{snip.title}</h2>
        </div>
        <div className="p-4">
          <SnippetEditForm snippet={snip} />
        </div>
      </div>
    </div>
  );
}
