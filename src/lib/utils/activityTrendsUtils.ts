import { UserActivityTrends, LinkStatusTrends } from '@/lib/types/dashboard';
import { ChartMetric } from '@/components/ui/ChartCard';

export const transformUserActivityToMetrics = (activityTrends: UserActivityTrends | null): ChartMetric[] => {
  if (!activityTrends) {
    return [
      { id: 'subscribers', label: '가입자 수', value: 0, growth: 0, color: '#0000ee' },
      { id: 'link-views', label: '링크 열람 수', value: 0, growth: 0, color: '#34a853' },
      { id: 'folder-creates', label: '폴더 생성 수', value: 0, growth: 0, color: '#ea8600' },
      { id: 'link-creates', label: '링크 생성 수', value: 0, growth: 0, color: '#d93025' },
    ];
  }

  return [
    {
      id: 'subscribers',
      label: '가입자 수',
      value: activityTrends.subscribers.current,
      growth: activityTrends.subscribers.growth,
      color: '#0000ee',
    },
    {
      id: 'link-views',
      label: '링크 열람 수',
      value: activityTrends.linkViews.current,
      growth: activityTrends.linkViews.growth,
      color: '#34a853',
    },
    {
      id: 'folder-creates',
      label: '폴더 생성 수',
      value: activityTrends.folderCreates.current,
      growth: activityTrends.folderCreates.growth,
      color: '#ea8600',
    },
    {
      id: 'link-creates',
      label: '링크 생성 수',
      value: activityTrends.linkCreates.current,
      growth: activityTrends.linkCreates.growth,
      color: '#d93025',
    },
  ];
};

export const transformLinkStatusToMetrics = (linkStatusTrends: LinkStatusTrends | null): ChartMetric[] => {
  if (!linkStatusTrends) {
    return [
      { id: 'new-links', label: '신규 생성', value: 0, growth: 0, color: '#0000ee' },
      { id: 'views', label: '열람', value: 0, growth: 0, color: '#34a853' },
      { id: 'trash', label: '휴지통 이동', value: 0, growth: 0, color: '#ea8600' },
      { id: 'deleted', label: '영구 삭제', value: 0, growth: 0, color: '#d93025' },
    ];
  }

  return [
    {
      id: 'new-links',
      label: '신규 생성',
      value: linkStatusTrends.newLinks.current,
      growth: linkStatusTrends.newLinks.growth,
      color: '#0000ee',
    },
    {
      id: 'views',
      label: '열람',
      value: linkStatusTrends.views.current,
      growth: linkStatusTrends.views.growth,
      color: '#34a853',
    },
    {
      id: 'trash',
      label: '휴지통 이동',
      value: linkStatusTrends.trash.current,
      growth: linkStatusTrends.trash.growth,
      color: '#ea8600',
    },
    {
      id: 'deleted',
      label: '영구 삭제',
      value: linkStatusTrends.deleted.current,
      growth: linkStatusTrends.deleted.growth,
      color: '#d93025',
    },
  ];
};

export const transformUserActivityToChartData = (activityTrends: UserActivityTrends | null): number[][] => {
  if (!activityTrends) {
    return Array(4).fill(Array(30).fill(0));
  }

  return [
    activityTrends.subscribers.dailyData,
    activityTrends.linkViews.dailyData,
    activityTrends.folderCreates.dailyData,
    activityTrends.linkCreates.dailyData,
  ];
};

export const transformLinkStatusToChartData = (linkStatusTrends: LinkStatusTrends | null): number[][] => {
  if (!linkStatusTrends) {
    return Array(4).fill(Array(30).fill(0));
  }

  return [
    linkStatusTrends.newLinks.dailyData,
    linkStatusTrends.views.dailyData,
    linkStatusTrends.trash.dailyData,
    linkStatusTrends.deleted.dailyData,
  ];
};
