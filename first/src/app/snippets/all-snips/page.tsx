import { db } from "@/db/db";
import React from "react";
import Link from "next/link";
export default async function page() {
  const snippets = await db.query.snippet.findMany();
  const renderedSnippets = snippets.map((snip) => {
    return (
      <Link
        key={snip.id}
        className="text-white flex justify-between items-center py-4"
        href={`/snippets/${snip.id}`}
      >
        {snip.title}
        <div>View</div>
      </Link>
    );
  });
  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 border-rounded ">
          Create a new snippet
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
