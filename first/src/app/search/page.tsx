import { redirect } from "next/navigation";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";
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

  return <div className="px-10 py-24">
    <PostList fetchData={()=>fetchPostsBySearchTerm(term)}/>
  </div>
}
