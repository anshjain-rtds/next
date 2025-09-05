import React, { Suspense } from "react";
import Link from "next/link";
import SnipShow from "./snip-show";
import { LoaderFour } from "@/components/ui/loader";

export default async function page() {
  return (
    <div className=" mx-auto px-10 py-24 max-w-4xl min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Snippets</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage your code snippets
          </p>
        </div>
        <Link
          href="/snippets/new"
          className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200 shadow-md"
        >
          Create New Snippet
        </Link>
      </div>
      <Suspense fallback={<LoaderFour text="Loading Snippets..." />}>
        <SnipShow />
      </Suspense>
    </div>
  );
}
