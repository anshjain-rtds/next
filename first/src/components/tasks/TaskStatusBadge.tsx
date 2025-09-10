// components/TaskStatusBadge.tsx
import { TaskStatus } from '@/lib/types/task';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.OPEN:
        return {
          label: 'Open',
          className: 'bg-gray-100 text-gray-800 border-gray-300'
        };
      case TaskStatus.IN_PROGRESS:
        return {
          label: 'In Progress',
          className: 'bg-blue-100 text-blue-800 border-blue-300'
        };
      case TaskStatus.DONE:
        return {
          label: 'Done',
          className: 'bg-green-100 text-green-800 border-green-300'
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-300'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}

