import { useState, useCallback } from 'react';

/**
 * 메트릭 표시/숨김을 토글하는 커스텀 훅
 */
export const useMetricToggle = (initialMetrics: Set<string>) => {
  const [visibleMetrics, setVisibleMetrics] = useState<Set<string>>(initialMetrics);

  const toggleMetric = useCallback((metricId: string) => {
    setVisibleMetrics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(metricId)) {
        newSet.delete(metricId);
      } else {
        newSet.add(metricId);
      }
      return newSet;
    });
  }, []);

  return {
    visibleMetrics,
    toggleMetric,
  };
};
