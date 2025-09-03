import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import Profile from "@/components/profile";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/sign-out";
import { signIn } from "@/actions/sign-in";
import SearchInput from "@/components/search-input";
import { Suspense } from "react";

export async function Header() {
  const session = await auth();
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
          
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <Profile />
                <form action={signOut}>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <form action={signIn}>
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Sign In
                </Button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
