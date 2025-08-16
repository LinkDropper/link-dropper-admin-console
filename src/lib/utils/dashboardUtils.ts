import { DashboardStats } from '@/lib/types/dashboard';
import { StatCardData } from '@/components/ui/StatCard';

/**
 * API에서 받은 통계 데이터를 StatCard용 데이터로 변환합니다.
 */
export const transformStatsToCardData = (stats: DashboardStats): StatCardData[] => {
  return [
    {
      label: '총 사용자',
      value: stats.totalUsers.current,
      growth: stats.totalUsers.changePercentage,
      icon: 'users',
    },
    {
      label: '활성 사용자',
      value: stats.activeUsers.current,
      growth: stats.activeUsers.changePercentage,
      icon: 'user-check',
    },
    {
      label: '총 게시 페이지',
      value: stats.totalPublications.current,
      growth: stats.totalPublications.changePercentage,
      icon: 'file-text',
    },
    {
      label: '일간 링크 열람',
      value: stats.dailyLinkViews.current,
      growth: stats.dailyLinkViews.changePercentage,
      icon: 'eye',
    },
  ];
};
