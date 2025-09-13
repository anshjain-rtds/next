// app/queue-dashboard/enhanced/page.tsx
"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Play,
  Clock,
  Users,
  BarChart3,
  Trash2,
  RefreshCw,
  Plus,
  AlertCircle,
  CheckCircle,
  Timer,
  Activity,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useQueue } from "@/hooks/use-queue";
import { QueueStatusCard } from "@/components/queue/queue-status-card";
import { QueueMetrics } from "@/components/queue/queue-metrix";
import { RealTimeStats } from "@/components/queue/real-time-stats";
import {
  addJobAction,
  addDelayedJobAction,
  addBulkJobsAction,
  clearQueueAction,
} from "@/actions/queue";

export default function EnhancedQueueDashboard() {
  const [isPending, startTransition] = useTransition();
  const { status, isLoading, error, autoRefresh, setAutoRefresh, refresh } =
    useQueue(2000);

  // Form states
  const [message, setMessage] = useState("Hello from the enhanced queue! 🚀");
  const [delayMessage, setDelayMessage] = useState(
    "This is a delayed job message"
  );
  const [delay, setDelay] = useState("5000");
  const [bulkCount, setBulkCount] = useState("10");

  // Handle adding a regular job with server actions
  const handleAddJob = async () => {
    startTransition(async () => {
      try {
        const result = await addJobAction(message);

        if (result.success) {
          toast.success(`🎉 Job added successfully!`, {
            description: `Job ID: ${result.jobId}`,
          });
          refresh();
          setMessage("Hello from the enhanced queue! 🚀");
        } else {
          toast.error("Failed to add job", {
            description: result.message,
          });
        }
      } catch (error) {
        toast.error(`Network error occurred: ${error}`);
      }
    });
  };

  // Handle adding a delayed job
  const handleAddDelayedJob = async () => {
    startTransition(async () => {
      try {
        const result = await addDelayedJobAction(delayMessage, parseInt(delay));

        if (result.success) {
          toast.success(`⏰ Delayed job scheduled!`, {
            description: `Will run in ${parseInt(delay) / 1000} seconds`,
          });
          refresh();
          setDelayMessage("This is a delayed job message");
        } else {
          toast.error("Failed to schedule delayed job", {
            description: result.message,
          });
        }
      } catch (error) {
        toast.error(`Network error occurred: ${error}`);
      }
    });
  };

  // Handle adding bulk jobs
  const handleAddBulkJobs = async () => {
    startTransition(async () => {
      try {
        const result = await addBulkJobsAction(parseInt(bulkCount));

        if (result.success) {
          toast.success(`🚀 Bulk jobs added!`, {
            description: `${bulkCount} jobs queued for processing`,
          });
          refresh();
        } else {
          toast.error("Failed to add bulk jobs", {
            description: result.message,
          });
        }
      } catch (error) {
        toast.error(`Network error occurred: ${error}`);
      }
    });
  };

  // Handle clearing queue
  const handleClearQueue = async () => {
    startTransition(async () => {
      try {
        const result = await clearQueueAction();

        if (result.success) {
          toast.success("🧹 Queue cleared successfully!");
          refresh();
        } else {
          toast.error("Failed to clear queue", {
            description: result.message,
          });
        }
      } catch (error) {
        toast.error(`Network error occurred: ${error}`);
      }
    });
  };

  const totalJobs =
    status.waiting + status.active + status.completed + status.failed;
  const isOperationPending = isPending || isLoading;

  return (
    <div className="container mx-auto py-24 px-10  space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enhanced Queue Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring and management of your BullMQ job queues
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto-refresh
            </Label>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={isOperationPending}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${
                isOperationPending ? "animate-spin" : ""
              }`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QueueStatusCard
          title="Waiting Jobs"
          value={status.waiting}
          description="Jobs in queue"
          icon={Timer}
          color="text-amber-600"
        />
        <QueueStatusCard
          title="Active Jobs"
          value={status.active}
          description="Currently processing"
          icon={Play}
          color="text-blue-600"
        />
        <QueueStatusCard
          title="Completed"
          value={status.completed}
          description="Successfully processed"
          icon={CheckCircle}
          color="text-green-600"
        />
        <QueueStatusCard
          title="Failed Jobs"
          value={status.failed}
          description="Processing failed"
          icon={AlertCircle}
          color="text-red-600"
        />
      </div>

      {/* Metrics and Real-time Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QueueMetrics status={status} />
        <RealTimeStats currentStatus={status} />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Manage your queue with one-click operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={refresh}
              disabled={isOperationPending}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearQueue}
              disabled={isOperationPending}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Queue
            </Button>

            <Badge
              variant={totalJobs > 0 ? "default" : "secondary"}
              className="px-3 py-1"
            >
              {totalJobs} Total Jobs
            </Badge>

            <Badge
              variant={autoRefresh ? "default" : "outline"}
              className="px-3 py-1"
            >
              {autoRefresh ? "Live Updates" : "Manual Refresh"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Job Management Tabs */}
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="single" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Single Job
          </TabsTrigger>
          <TabsTrigger value="delayed" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Delayed Job
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Bulk Jobs
          </TabsTrigger>
        </TabsList>

        {/* Single Job Tab */}
        <TabsContent value="single" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Add Single Job
              </CardTitle>
              <CardDescription>
                Add a single job to the queue for immediate processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Job Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your job message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button
                onClick={handleAddJob}
                disabled={isOperationPending || !message.trim()}
                className="w-full"
                size="lg"
              >
                {isOperationPending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Add Job to Queue
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delayed Job Tab */}
        <TabsContent value="delayed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Schedule Delayed Job
              </CardTitle>
              <CardDescription>
                Schedule a job to run after a specified delay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="delayMessage">Job Message</Label>
                <Textarea
                  id="delayMessage"
                  placeholder="Enter delayed job message..."
                  value={delayMessage}
                  onChange={(e) => setDelayMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="delay">Delay (milliseconds)</Label>
                <Input
                  id="delay"
                  type="number"
                  placeholder="5000"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  min="1000"
                />
                <p className="text-xs text-muted-foreground">
                  Current delay: {Math.floor(parseInt(delay || "0") / 1000)}{" "}
                  seconds
                </p>
              </div>

              <Button
                onClick={handleAddDelayedJob}
                disabled={isOperationPending || !delayMessage.trim()}
                className="w-full"
                size="lg"
              >
                {isOperationPending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Clock className="h-4 w-4 mr-2" />
                )}
                Schedule Job
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bulk Jobs Tab */}
        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Add Bulk Jobs
              </CardTitle>
              <CardDescription>
                Add multiple jobs to the queue at once for batch processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="bulkCount">Number of Jobs</Label>
                <Input
                  id="bulkCount"
                  type="number"
                  placeholder="10"
                  value={bulkCount}
                  onChange={(e) => setBulkCount(e.target.value)}
                  min="1"
                  max="100"
                />
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This will create <strong>{bulkCount}</strong> jobs with
                  sequential numbering and batch ID. Each job will be processed
                  independently by your workers.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleAddBulkJobs}
                disabled={isOperationPending || parseInt(bulkCount) < 1}
                className="w-full"
                size="lg"
              >
                {isOperationPending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Users className="h-4 w-4 mr-2" />
                )}
                Add {bulkCount} Jobs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Stats */}
      <div className="flex justify-center items-center gap-4">
        <Badge
          variant={totalJobs > 0 ? "default" : "secondary"}
          className="px-4 py-2 text-sm"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          {totalJobs > 0
            ? `${totalJobs} total jobs processed`
            : "Queue is empty"}
        </Badge>

        {status.active > 0 && (
          <Badge variant="outline" className="px-4 py-2 text-sm animate-pulse">
            <Activity className="h-4 w-4 mr-2" />
            {status.active} jobs processing
          </Badge>
        )}
      </div>
    </div>
  );
}
