"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { QueueStatus } from "@/actions/queue";

interface RealTimeStatsProps {
  currentStatus: QueueStatus;
}

interface StatusChange {
  field: keyof QueueStatus;
  previous: number;
  current: number;
  trend: "up" | "down" | "same";
}

export function RealTimeStats({ currentStatus }: RealTimeStatsProps) {
  const [previousStatus, setPreviousStatus] =
    useState<QueueStatus>(currentStatus);
  const [changes, setChanges] = useState<StatusChange[]>([]);

  useEffect(() => {
    const newChanges: StatusChange[] = [];

    (Object.keys(currentStatus) as Array<keyof QueueStatus>).forEach((key) => {
      const current = currentStatus[key];
      const previous = previousStatus[key];

      let trend: "up" | "down" | "same" = "same";
      if (current > previous) trend = "up";
      else if (current < previous) trend = "down";

      newChanges.push({
        field: key,
        previous,
        current,
        trend,
      });
    });

    setChanges(newChanges);
    setPreviousStatus(currentStatus);
  }, [currentStatus, previousStatus]);

  const getTrendIcon = (trend: "up" | "down" | "same") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: "up" | "down" | "same") => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Real-time Changes</CardTitle>
        <CardDescription>Live tracking of queue status changes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {changes.map((change) => (
            <div
              key={change.field}
              className="flex items-center justify-between p-2 rounded-lg border"
            >
              <div className="flex items-center gap-2">
                {getTrendIcon(change.trend)}
                <span className="text-sm font-medium capitalize">
                  {change.field.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {change.previous}
                </span>
                <span className="text-xs">→</span>
                <Badge
                  variant="outline"
                  className={getTrendColor(change.trend)}
                >
                  {change.current}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
