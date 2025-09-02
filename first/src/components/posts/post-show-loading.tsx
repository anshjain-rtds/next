import { Skeleton } from "../ui/skeleton";

export default function PostShowLoading() {
  return (
    <div className="my-4">
      <div className="my-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-48" />
      </div>
    </div>
  );
}
