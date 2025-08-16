type DashboardStat = {
  changePercentage: number;
  current: number;
  percentage: number;
}

export type DashboardStats = {
  activeUsers: DashboardStat;
  dailyLinkViews: DashboardStat;
  totalPublications: DashboardStat;
  totalUsers: DashboardStat;
}

type ActivityMetric = {
  current: number;
  growth: number;
  dailyData: number[];
}

export type UserActivityTrends = {
  subscribers: ActivityMetric;
  linkViews: ActivityMetric;
  folderCreates: ActivityMetric;
  linkCreates: ActivityMetric;
}

export type LinkStatusTrends = {
  newLinks: ActivityMetric;
  views: ActivityMetric;
  trash: ActivityMetric;
  deleted: ActivityMetric;
}