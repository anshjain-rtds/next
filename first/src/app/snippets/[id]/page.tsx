import { db } from "@/db/db";
import { snippet } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage({
  params,
}: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000));
  const { id } = await params;

  const ans = await db.query.snippet.findFirst({
    where: eq(snippet.id, Number(id)),
  });
  // const ans = snip.find((s) => s.id === Number(id));
  console.log(ans);
  if (!ans) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4 my-12">
      <div className="text-white flex flex-row">
        <h1 className="text-white font-bold">{ans.title}</h1>
        <div>
          <Link href={`/snippets/${id}/edit`}>
            <button className="p-2 border rounded">Edit</button>
          </Link>
          <button className="p-2 border rounded">Delete</button>
        </div>
      </div>
      <pre>
        <code className="text-white p-3 border rounded bg-gray-400 border-gray-200">
          {ans.code}
        </code>
      </pre>
    </div>
  );
}
