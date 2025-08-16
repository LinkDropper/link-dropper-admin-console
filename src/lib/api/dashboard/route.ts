'use server';

import { getFetch } from "@/lib/requests/customFetch";
import getApiBaseUrl from "@/lib/utils/getApiBaseUrl";
import { DashboardStats, UserActivityTrends, LinkStatusTrends } from "@/lib/types/dashboard"; 

const getDashboardStats = async () => {
  try {
    const response: DashboardStats = await getFetch({
      url: `${getApiBaseUrl()}/admin/dashboard/stats`,
      options: {
        next: {
          revalidate: 0,
        }
      },
    });
  
    return response;
  } catch (error) {
    console.error('Failed to get dashboard stats', error);
    return null;
  }
};

const getDashboardActivityTrends = async (): Promise<UserActivityTrends | null> => {
  try {
    const response: UserActivityTrends = await getFetch({
      url: `${getApiBaseUrl()}/admin/dashboard/activity-trends`,
      options: {
        next: {
          revalidate: 0,
        }
      },
    });

    return response;
  } catch (error) {
    console.error('Failed to get dashboard activity trends', error);
    return null;
  }
};

const getDashboardLinkStatusTrends = async (): Promise<LinkStatusTrends | null> => {
  try {
    const response: LinkStatusTrends = await getFetch({
      url: `${getApiBaseUrl()}/admin/dashboard/link-status-trends`,
      options: {
        next: {
          revalidate: 0,
        }
      },
    });

    return response;
  } catch (error) {
    console.error('Failed to get dashboard link status trends', error);
    return null;
  }
};

export { getDashboardStats, getDashboardActivityTrends, getDashboardLinkStatusTrends };