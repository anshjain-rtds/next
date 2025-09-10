// app/tasks/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { fetchTasks } from "@/actions/tasks";
import TaskList from "@/components/tasks/TaskList";
import TaskFilters from "@/components/tasks/TaskFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskStatus } from "@/lib/types/task";

interface TasksPageProps {
  searchParams?: {
    status?: TaskStatus;
    search?: string;
  };
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const awaitedSearchParams = searchParams ? await searchParams : undefined;

  const result = await fetchTasks(awaitedSearchParams);

  if (!result.success) {
    return (
      <div className="mx-auto px-10 py-24 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{result.error}</p>
          <Link
            href="/auth"
            className="text-blue-600 hover:text-blue-500 mt-4 inline-block"
          >
            Sign in again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 py-24 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-2">
            Manage and track your tasks efficiently
          </p>
        </div>

        <Link href="/tasks/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <Suspense
            fallback={
              <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
            }
          >
            <TaskFilters />
          </Suspense>
        </div>

        <div className="p-6">
          <Suspense
            fallback={
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            }
          >
            <TaskList tasks={result.tasks} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
