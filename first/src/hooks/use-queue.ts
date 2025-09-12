

import { useState, useEffect, useCallback } from 'react';
import { QueueStatus, getQueueStatus } from '@/actions/queue';

export function useQueue(autoRefreshInterval: number = 3000) {
  const [status, setStatus] = useState<QueueStatus>({
    waiting: 0,
    active: 0,
    completed: 0,
    failed: 0,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getQueueStatus();
      if (response.success && response.queueStatus) {
        setStatus(response.queueStatus);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch queue status');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchStatus, autoRefreshInterval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fetchStatus, autoRefresh, autoRefreshInterval]);

  return {
    status,
    isLoading,
    error,
    autoRefresh,
    setAutoRefresh,
    refresh: fetchStatus,
  };
}
