import { db } from "@/db/db";
import React from "react";
import Link from "next/link";

export default async function page() {
  const snippets = await db.query.snippet.findMany();
  const renderedSnippets = snippets.map((snip) => {
    return (
      <Link
        key={snip.id}
        className="flex justify-between items-center py-4 px-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200"
        href={`/snippets/${snip.id}`}
      >
        <span className="text-gray-800 font-medium">{snip.title}</span>
        <div className="text-sm text-blue-600 hover:underline">View</div>
      </Link>
    );
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl py-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-400">Snippets</h1>
        <Link 
          href="/snippets/new" 
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
        >
          Create New Snippet
        </Link>
      </div>
      <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
        {renderedSnippets}
      </div>
    </div>
  );
}