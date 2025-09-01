import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import Profile from "./profile";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/sign-out"; 
import { signIn } from "@/actions/sign-in";

// import {Navbar,NavbarBrand,NavbarContent,NavbarItem,Input,Button,Avatar} from '@heroui/react'
export async function Header() {
  const session = await auth();
  return (
    <header className="w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 shadow-lg fixed  z-1">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="font-extrabold text-3xl text-white tracking-tight hover:text-blue-200 transition-colors duration-200">
          CodeSnips
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/snippets/all-snips" className="text-lg text-blue-100 hover:text-white font-medium transition-colors duration-200">
            All Snippets
          </Link>
          <Link href="/snippets/new" className="text-lg text-blue-100 hover:text-white font-medium transition-colors duration-200">
            New Snippet
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {session?.user ? (
            <>
              <div className="flex items-center gap-3">
                <Profile />
              </div>
              <form action={signOut}>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded transition duration-200">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <form action={signIn}>
              <Button type="submit" variant={"default"} className="bg-green-500 text-white font-bold px-4 py-2 rounded transition duration-200">
                Sign In
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}