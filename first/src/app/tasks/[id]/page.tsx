// app/tasks/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Edit } from 'lucide-react';
import { fetchTaskById } from '@/actions/tasks';
import { Button } from '@/components/ui/button';
import TaskStatusBadge from '@/components/tasks/TaskStatusBadge';
import TaskActions from '@/components/tasks/TaskActions';
import { TaskStatus } from '@/lib/types/task';

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const result = await fetchTaskById(params.id);

  if (!result.success || !result.task) {
    notFound();
  }

  const { task } = result;

  return (
    <div className="container mx-auto px-10 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/tasks" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Tasks
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {task.title}
                </h1>
                <TaskStatusBadge status={task.status} />
              </div>
              
              <div className="flex items-center gap-2 ml-6">
                <Link href={`/tasks/${task.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                
                <TaskActions task={task} />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Quick Actions
                </h2>
                <TaskStatusActions taskId={task.id} currentStatus={task.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for quick status changes
function TaskStatusActions({ taskId, currentStatus }: { taskId: string, currentStatus: string }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {currentStatus !== 'OPEN' && (
        <TaskStatusButton taskId={taskId} status="OPEN" label="Mark as Open" />
      )}
      {currentStatus !== 'IN_PROGRESS' && (
        <TaskStatusButton taskId={taskId} status="IN_PROGRESS" label="Start Progress" />
      )}
      {currentStatus !== 'DONE' && (
        <TaskStatusButton taskId={taskId} status="DONE" label="Mark as Done" />
      )}
    </div>
  );
}

function TaskStatusButton({ taskId, status, label }: { taskId: string, status: string, label: string }) {
  return (
    <form action={async () => {
      'use server';
      const { updateTaskStatusAction } = await import('@/actions/tasks');
      await updateTaskStatusAction(taskId, status as TaskStatus);
    }}>
      <Button 
        type="submit" 
        variant="outline" 
        size="sm"
        className="text-sm"
      >
        {label}
      </Button>
    </form>
  );
}