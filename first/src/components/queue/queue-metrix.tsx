// components/queue/queue-metrics.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QueueStatus } from "@/actions/queue";

interface QueueMetricsProps {
  status: QueueStatus;
}

export function QueueMetrics({ status }: QueueMetricsProps) {
  const total =
    status.waiting + status.active + status.completed + status.failed;
  const completionRate = total > 0 ? (status.completed / total) * 100 : 0;
  const failureRate = total > 0 ? (status.failed / total) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Queue Metrics</CardTitle>
        <CardDescription>
          Performance overview of your job queue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion Rate</span>
            <span>{completionRate.toFixed(1)}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Failure Rate</span>
            <span className="text-red-600">{failureRate.toFixed(1)}%</span>
          </div>
          <Progress value={failureRate} className="h-2 bg-red-100" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {status.active}
            </div>
            <div className="text-xs text-muted-foreground">Processing Now</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {status.waiting}
            </div>
            <div className="text-xs text-muted-foreground">In Queue</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
