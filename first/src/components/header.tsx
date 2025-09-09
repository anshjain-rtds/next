import Link from "next/link";
import React from "react";
import { getCustomSession } from '@/lib/session';
import ClientHeader from "@/components/ClientHeader";
import SearchInput from "@/components/search-input";
import { Suspense } from "react";

export async function Header() {
  const session = await getCustomSession();
  
  return (
    <header className="w-full bg-gradient-to-r from-primary to-blue-600 shadow-lg fixed top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link
          href="/"
          className="font-bold text-2xl text-white tracking-tight hover:opacity-90 transition-opacity"
        >
          CodeSnips
        </Link>
        
        <div className="flex-1 max-w-md mx-8">
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6">
            <Link
              href="/snippets/all-snips"
              className="text-base text-blue-100 hover:text-white font-medium transition-colors"
            >
              All Snippets
            </Link>
            <Link
              href="/snippets/new"
              className="text-base text-blue-100 hover:text-white font-medium transition-colors"
            >
              New Snippet
            </Link>
          </div>
          
          {/* Pass session to client component for interactive features */}
          <ClientHeader initialSession={session} />
        </div>
      </nav>
    </header>
  );
}