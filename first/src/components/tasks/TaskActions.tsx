// components/TaskActions.tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTaskAction } from '@/actions/tasks';
import { Button } from '@/components/ui/button';
import { Trash2, MoreVertical } from 'lucide-react';
import { Task } from '@/lib/types/task';

interface TaskActionsProps {
  task: Task;
  compact?: boolean;
}

export default function TaskActions({ task, compact = false }: TaskActionsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTaskAction(task.id);
      
      if (result.success) {
        router.push('/tasks');
        router.refresh();
      } else {
        alert(result.error || 'Failed to delete task');
      }
    });
  };

  if (compact) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
          className="p-1"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
        
        {showDeleteConfirm && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-10">
            <p className="text-sm text-gray-600 mb-2">Delete this task?</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
                className="text-xs"
              >
                {isPending ? '...' : 'Delete'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowDeleteConfirm(true)}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </Button>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Task
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete &quot;{task.title}&quot;? This action cannot be undone.
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? 'Deleting...' : 'Delete Task'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

