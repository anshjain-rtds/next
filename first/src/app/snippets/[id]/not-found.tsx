import Link from "next/link";

export default function SnippetNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
      <h1 className="text-2xl font-bold text-red-400 mb-4">
        Snippet not found
      </h1>
      <p className="text-gray-400 mb-6">
        Sorry, we couldn’t locate the snippet you’re looking for.
      </p>
      <Link
        href="/snippets"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
      >
        Back to Snippets
      </Link>
    </div>
  );
}
