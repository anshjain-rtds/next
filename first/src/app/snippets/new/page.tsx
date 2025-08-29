'use client';
import React from "react";
import { useActionState, startTransition } from "react";
import * as actions from "@/actions/index";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 sm:p-8 bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col gap-6">
        <h3 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">Create a Snippet</h3>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <label htmlFor="title" className="w-16 text-gray-700 font-semibold text-sm">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="flex-1 border text-black border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              id="title"
              placeholder="Enter snippet title..."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <label htmlFor="code" className="w-16 text-gray-700 font-semibold text-sm">
              Code
            </label>
            <textarea
              name="code"
              className="flex-1 border text-black border-gray-300 rounded-md p-2 text-sm h-32 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              id="code"
              placeholder="Enter your code here..."
            />
          </div>
        </div>

        {formState.message && (
          <div className="my-2 p-3 bg-red-100 border border-red-400 rounded-md text-red-700 text-sm">
            {formState.message}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full rounded-md p-3 bg-blue-600 text-white font-bold tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
}