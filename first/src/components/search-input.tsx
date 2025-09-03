"use client";

import { search } from "@/actions/search";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={search} className="relative w-full max-w-md">
      <Input
        name="term"
        className="w-full pl-4 pr-10 py-2 text-base bg-white/10 border-white/20 text-white placeholder:text-blue-100 focus-visible:ring-white/30"
        defaultValue={searchParams.get("term") || ""}
        placeholder="Search snippets..."
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </form>
  );
}