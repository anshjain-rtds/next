// app/tasks/new/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CreateTaskForm from '@/components/tasks/CreateTaskForm';

export default function CreateTaskPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-2xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
            <p className="text-gray-600 mt-2">
              Add a new task to your task list
            </p>
          </div>
          
          <div className="p-6">
            <CreateTaskForm />
          </div>
        </div>
      </div>
    </div>
  );
}