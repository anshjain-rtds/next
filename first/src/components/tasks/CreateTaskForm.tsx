// components/CreateTaskForm.tsx
"use client";

import { useActionState, useTransition } from "react";
import { createTaskAction } from "@/actions/tasks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateTaskForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(createTaskAction, {});

  useEffect(() => {
    if (state?.success) {
      startTransition(() => {
        router.push("/tasks");
        router.refresh();
      });
    }
  }, [state?.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task title..."
          disabled={isPending}
        />
        {state?.fieldErrors?.title && (
          <p className="mt-1 text-sm text-red-600">
            {state.fieldErrors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your task in detail..."
          disabled={isPending}
        />
        {state?.fieldErrors?.description && (
          <p className="mt-1 text-sm text-red-600">
            {state.fieldErrors.description[0]}
          </p>
        )}
      </div>

      {state?.error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isPending ? "Creating..." : "Create Task"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

