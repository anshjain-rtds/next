"use client";

import { search } from "@/actions/search";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={search} className="relative flex items-center">
      <Input
        name="term"
        className="w-3/4 text-lg font-semibold text-white pr-10"
        defaultValue={searchParams.get("term") || ""}
        placeholder="Search snippets..."
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <line
            x1="21"
            y1="21"
            x2="16.65"
            y2="16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  );
}