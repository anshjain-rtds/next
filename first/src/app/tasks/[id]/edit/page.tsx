// app/tasks/[id]/edit/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { fetchTaskById } from '@/actions/tasks';
import EditTaskForm from '@/components/tasks/EditTaskForm';

interface EditTaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const result = await fetchTaskById((await params).id);

  if (!result.success || !result.task) {
    notFound();
  }

  return (
    <div className="container mx-auto px-10 py-24 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href={`/tasks/${(await params).id}`}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Task
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
            <p className="text-gray-600 mt-2">
              Update your task details
            </p>
          </div>
          
          <div className="p-6">
            <EditTaskForm task={result.task} />
          </div>
        </div>
      </div>
    </div>
  );
}