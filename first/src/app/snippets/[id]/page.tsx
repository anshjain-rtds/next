import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import * as actions from "@/actions/index";
import DeleteButton from "./DeleteButton"; // Adjust path as needed
import { CodeBlock } from "@/components/ui/code-block";

export default async function SnippetShowPage(props : {
  params : Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const ans = await db.query.snippet.findFirst({
    where: eq(snippet.id, Number(id)),
  });

  if (!ans) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, Number(id));

  return (
    <div className=" mx-auto px-10 py-24 max-w-4xl min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground break-words">{ans.title}</h1>
          <p className="text-muted-foreground mt-1">Snippet #{id}</p>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/snippets/all-snips"
            className="px-4 py-2 rounded-lg border border-input bg-background text-foreground font-medium hover:bg-muted transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <Link 
            href={`/snippets/${id}/edit`}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          <DeleteButton deleteAction={deleteSnippetAction} />
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="border-b border-border bg-muted/50 px-6 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Code</h2>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Python
              </span>
            </div>
          </div>
        </div>
        <pre className="p-6 bg-muted rounded-b-xl text-foreground text-sm overflow-x-auto">
          {/* <code className="whitespace-pre-wrap font-mono">{ans.code}</code> */}
          <CodeBlock filename={ans.title} code={ans.code} language="python" />
        </pre>
      </div>
    </div>
  );
}