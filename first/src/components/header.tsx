import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="w-full absolute text-white z-10">
      <nav className="container relative flex flex-wrap items-center justify-between p-4 mx-auto">
        <Link href="/" className="font-bold text-3xl">
          Home
        </Link>
        <div className="space-x-4 text-xl">
          <Link href="/snippets/all-snips">All Snippets</Link>
          <Link href="/snippets/new">New Snippet</Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
