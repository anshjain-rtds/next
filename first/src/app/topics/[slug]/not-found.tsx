import Link from "next/link";

export default function TopicNotFound() {
  return (
    <div className="container mx-auto px-10 py-24 max-w-2xl">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Topic not found
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Sorry, we couldn&apos;t find the topic you&apos;re looking for. It may have been removed or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}