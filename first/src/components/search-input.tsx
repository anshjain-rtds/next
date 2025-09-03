"use client";

import { search } from "@/actions/search";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <Input
        name="term"
        className="w-3/4 text-lg font-semibold text-white"
        defaultValue={searchParams.get("term") || ""}
      />
    </form>
  );
}
