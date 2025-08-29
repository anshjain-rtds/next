import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import * as actions from "@/actions/index";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage({
  params,
}: SnippetShowPageProps) {
  // Use a proper promise resolution, not `Promise` in the interface
  const { id } = params;

  // Added a short delay to simulate network latency for demonstration purposes
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const ans = await db.query.snippet.findFirst({
    where: eq(snippet.id, Number(id)),
  });

  if (!ans) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, Number(id));

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-400 leading-tight break-words">
          {ans.title}
        </h1>
        <div className="flex items-center gap-4">
          <Link href={`/snippets/${id}/edit`}>
            <button className="px-5 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Edit
            </button>
          </Link>
          <form action={deleteSnippetAction}>
            <button className="px-5 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Delete
            </button>
          </form>
        </div>
      </div>

      <pre className="p-6 bg-gray-800 rounded-lg text-gray-200 text-sm overflow-x-auto shadow-md">
        <code className="whitespace-pre-wrap">{ans.code}</code>
      </pre>
    </div>
  );
}