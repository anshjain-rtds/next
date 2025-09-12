export interface QueueJob {
  id: string;
  data: {
    message: string;
    userId?: number;
    timestamp: string;
    batchId?: number;
    jobNumber?: number;
  };
  status: 'waiting' | 'active' | 'completed' | 'failed';
  createdAt: string;
  processedOn?: string;
  failedReason?: string;
}

export interface QueueMetrics {
  totalJobs: number;
  completionRate: number;
  failureRate: number;
  averageProcessingTime: number;
  throughput: number;
}

export interface JobFormData {
  message: string;
  userId?: number;
  delay?: number;
  count?: number;
}
