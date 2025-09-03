import { db } from "@/db/db";
import React from "react";
import Link from "next/link";

export default async function SnipShow() {
  await new Promise((resolve)=>setTimeout(resolve,2500))

  const snippets = await db.query.snippet.findMany();
  const renderedSnippets = snippets.map((snip) => {
    return (
      <Link
        key={snip.id}
        className="flex justify-between items-center p-4 rounded-xl bg-card shadow-md hover:shadow-lg transition-all duration-200 border border-border"
        href={`/snippets/${snip.id}`}
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">{snip.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {snip.code.substring(0, 100)}{snip.code.length > 100 ? '...' : ''}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">View</span>
        </div>
      </Link>
    );
  });

  return (
    <div className=" mx-auto  max-w-4xl">
      
      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Your Snippets</h2>
          <span className="text-sm text-muted-foreground">{snippets.length} snippets</span>
        </div>
        
        {snippets.length > 0 ? (
          <div className="flex flex-col gap-4">
            {renderedSnippets}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No snippets yet</h3>
            <p className="text-muted-foreground mb-4">Create your first code snippet to get started</p>
            <Link 
              href="/snippets/new" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Create Snippet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}