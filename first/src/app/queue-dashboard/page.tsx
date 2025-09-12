// app/queue-dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

// Types
interface QueueStatus {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  jobId?: string;
  jobIds?: string[];
  queueStatus?: QueueStatus;
}

export default function QueueDashboard() {
  const [queueStatus, setQueueStatus] = useState<QueueStatus>({
    waiting: 0,
    active: 0,
    completed: 0,
    failed: 0
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Form states
  const [message, setMessage] = useState('Hello from the queue!');
  const [userId, setUserId] = useState('1');
  const [delayMessage, setDelayMessage] = useState('Delayed job message');
  const [delay, setDelay] = useState('5000');
  const [bulkCount, setBulkCount] = useState('10');

  // Fetch queue status
  const fetchQueueStatus = async () => {
    try {
      const response = await fetch('/api/queue/status');
      const data: ApiResponse = await response.json();
      
      if (data.success && data.queueStatus) {
        setQueueStatus(data.queueStatus);
      }
    } catch (error) {
      console.error('Failed to fetch queue status:', error);
      toast.error('Failed to fetch queue status');
    }
  };

  // Add regular job
  const addJob = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/queue/add-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          userId: userId ? parseInt(userId) : undefined 
        })
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        toast.success(`Job added successfully! ID: ${data.jobId}`);
        fetchQueueStatus();
      } else {
        toast.error('Failed to add job');
      }
    } catch (error) {
      toast.error('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Add delayed job
  const addDelayedJob = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/queue/add-delayed-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: delayMessage, 
          delay: parseInt(delay) 
        })
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        toast.success(`Delayed job scheduled! ID: ${data.jobId}`);
        fetchQueueStatus();
      } else {
        toast.error('Failed to add delayed job');
      }
    } catch (error) {
      toast.error('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Add bulk jobs
  const addBulkJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/queue/add-bulk-jobs?count=${bulkCount}`, {
        method: 'POST'
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        toast.success(`Added ${bulkCount} jobs successfully!`);
        fetchQueueStatus();
      } else {
        toast.error('Failed to add bulk jobs');
      }
    } catch (error) {
      toast.error('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear queue
  const clearQueue = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/queue/clear', {
        method: 'POST'
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        toast.success('Queue cleared successfully!');
        fetchQueueStatus();
      } else {
        toast.error('Failed to clear queue');
      }
    } catch (error) {
      toast.error('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh effect
  useEffect(() => {
    fetchQueueStatus();
    
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchQueueStatus, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const totalJobs = queueStatus.waiting + queueStatus.active + queueStatus.completed + queueStatus.failed;

  return (
    <div className="container mx-auto py-24 px-10 min-h-screen space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Queue Management Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your BullMQ job queues</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-green-50 border-green-200" : ""}
          >
            <Activity className="h-4 w-4 mr-2" />
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchQueueStatus}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Queue Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waiting Jobs</CardTitle>
            <Timer className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{queueStatus.waiting}</div>
            <p className="text-xs text-muted-foreground">Jobs in queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Play className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{queueStatus.active}</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{queueStatus.completed}</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Jobs</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{queueStatus.failed}</div>
            <p className="text-xs text-muted-foreground">Processing failed</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Total jobs processed: {totalJobs}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchQueueStatus}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
            
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={clearQueue}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Queue
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Management Tabs */}
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="single">Single Job</TabsTrigger>
          <TabsTrigger value="delayed">Delayed Job</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Single Job</CardTitle>
              <CardDescription>Add a single job to the queue for immediate processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter job message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <div className="grid w-full gap-1.5">
                <Label htmlFor="userId">User ID (optional)</Label>
                <Input
                  id="userId"
                  type="number"
                  placeholder="Enter user ID..."
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              
              <Button onClick={addJob} disabled={isLoading} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Job to Queue
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delayed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Delayed Job</CardTitle>
              <CardDescription>Schedule a job to run after a specified delay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="delayMessage">Message</Label>
                <Textarea
                  id="delayMessage"
                  placeholder="Enter delayed job message..."
                  value={delayMessage}
                  onChange={(e) => setDelayMessage(e.target.value)}
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
                />
              </div>
              
              <Button onClick={addDelayedJob} disabled={isLoading} className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                Schedule Delayed Job
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Bulk Jobs</CardTitle>
              <CardDescription>Add multiple jobs to the queue at once for batch processing</CardDescription>
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
                  This will create {bulkCount} jobs with sequential numbering and batch ID.
                </AlertDescription>
              </Alert>
              
              <Button onClick={addBulkJobs} disabled={isLoading} className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Add {bulkCount} Jobs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Bar */}
      <div className="flex justify-center">
        <Badge variant={totalJobs > 0 ? "default" : "secondary"} className="px-4 py-2">
          Queue Status: {totalJobs > 0 ? `${totalJobs} total jobs` : 'Empty'}
        </Badge>
      </div>
    </div>
  );
}