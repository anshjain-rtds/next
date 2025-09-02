'use client';
import React from "react";
import { useActionState, startTransition } from "react";
import * as actions from "@/actions/index";
import Link from "next/link";

export default function Page() {
  const [formState, action] = useActionState(actions.createSnippet, { message: '' });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="container mx-auto px-10 py-24 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Snippet</h1>
          <p className="text-muted-foreground mt-1">Share your code with the community</p>
        </div>
        <Link 
          href="/snippets/all-snips" 
          className="text-sm text-primary hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to snippets
        </Link>
      </div>
      
      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-foreground">
              Snippet Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition duration-200"
              id="title"
              placeholder="Enter a descriptive title for your snippet"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="code" className="block text-sm font-medium text-foreground">
              Code
            </label>
            <textarea
              name="code"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition duration-200 min-h-[200px] font-mono text-sm"
              id="code"
              placeholder="Enter your code here..."
            />
          </div>

          {formState.message && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formState.message}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Link 
              href="/snippets/all-snips" 
              className="px-4 py-2 rounded-lg border border-input bg-background text-foreground font-medium hover:bg-muted transition-colors duration-200"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200 shadow-md"
            >
              Create Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}