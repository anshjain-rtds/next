// components/TaskList.tsx
import Link from 'next/link';
import { Task } from '@/lib/types/task';
import TaskStatusBadge from './TaskStatusBadge';
import TaskActions from './TaskActions';
import { Eye } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-600 mb-6">Get started by creating your first task.</p>
        <Link 
          href="/tasks/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Task
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {task.title}
                </h3>
                <TaskStatusBadge status={task.status} />
              </div>
              
              <p className="text-gray-600 line-clamp-2 mb-4">
                {task.description}
              </p>
              
              <div className="flex items-center gap-3">
                <Link
                  href={`/tasks/${task.id}`}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Link>
                <Link
                  href={`/tasks/${task.id}/edit`}
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-700 font-medium"
                >
                  Edit
                </Link>
              </div>
            </div>
            
            <div className="ml-4">
              <TaskActions task={task} compact />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

