'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/ui/StatCard';
import ChartCard from '@/components/ui/ChartCard';
import { DashboardStats, UserActivityTrends, LinkStatusTrends } from '@/lib/types/dashboard';
import { useMetricToggle } from '@/hooks/useMetricToggle';
import { transformStatsToCardData } from '@/lib/utils/dashboardUtils';
import { 
  transformUserActivityToMetrics,
  transformLinkStatusToMetrics,
  transformUserActivityToChartData,
  transformLinkStatusToChartData
} from '@/lib/utils/activityTrendsUtils';

import { 
  DEFAULT_VISIBLE_USER_METRICS,
  DEFAULT_VISIBLE_LINK_METRICS 
} from '@/lib/constants/dashboardConstants';

import styles from '../page.module.css';

interface ClientDashboardProps {
  stats: DashboardStats;
  activityTrends: UserActivityTrends | null;
  linkStatusTrends: LinkStatusTrends | null;
  chartLabels: string[];
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ stats, activityTrends, linkStatusTrends, chartLabels }) => {
  const userMetrics = useMetricToggle(DEFAULT_VISIBLE_USER_METRICS);
  const linkMetrics = useMetricToggle(DEFAULT_VISIBLE_LINK_METRICS);
  
  const statsCardData = transformStatsToCardData(stats);
  const userActivityMetrics = transformUserActivityToMetrics(activityTrends);
  const linkStatusMetrics = transformLinkStatusToMetrics(linkStatusTrends);
  const userActivityChartData = transformUserActivityToChartData(activityTrends);
  const linkStatusChartData = transformLinkStatusToChartData(linkStatusTrends);

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>대시보드</h1>
          <p className={styles.subtitle}>링크드로퍼 관리 현황을 확인하세요</p>
        </header>

        <section className={styles.statsGrid}>
          {statsCardData.map((stat) => (
            <StatCard key={stat.label} data={stat} />
          ))}
        </section>

        <section className={styles.chartsGrid}>
          <ChartCard
            title="사용자 활동 추이"
            description="최근 30일간 사용자 활동 현황"
            metrics={userActivityMetrics}
            chartData={userActivityChartData}
            chartLabels={chartLabels}
            visibleMetrics={userMetrics.visibleMetrics}
            onMetricToggle={userMetrics.toggleMetric}
          />
          
          <ChartCard
            title="링크 등록 현황"
            description="최근 30일간 링크 등록 추이"
            metrics={linkStatusMetrics}
            chartData={linkStatusChartData}
            chartLabels={chartLabels}
            visibleMetrics={linkMetrics.visibleMetrics}
            onMetricToggle={linkMetrics.toggleMetric}
          />
        </section>
      </div>
    </MainLayout>
  );
}

export default ClientDashboard;