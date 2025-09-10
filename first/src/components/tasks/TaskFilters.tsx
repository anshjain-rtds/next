// components/TaskFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TaskStatus } from '@/lib/types/task';

export default function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentStatus = searchParams?.get('status') as TaskStatus | null;
  const currentSearch = searchParams?.get('search') || '';

  const handleStatusChange = (status: TaskStatus | '') => {
    const params = new URLSearchParams(searchParams?.toString());
    
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    
    router.push(`/tasks?${params.toString()}`);
  };

  const handleSearchChange = (search: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    
    router.push(`/tasks?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search tasks..."
          value={currentSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <select
          value={currentStatus || ''}
          onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Statuses</option>
          <option value={TaskStatus.OPEN}>Open</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.DONE}>Done</option>
        </select>
      </div>
    </div>
  );
}