import { redirect } from "next/navigation";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";
import Link from "next/link";
interface SearchPageProps {
  searchParams: Promise<{
    term: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;
  if (!term) {
    redirect("/");
  }

  return (
    <div className="px-10 py-24 min-h-screen flex flex-col space-y-4">
      <Link
        href="/"
        className="text-sm text-primary hover:underline flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to home
      </Link>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
}
