import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_TOKEN_KEY } from "@/lib/constants/common";
import { getDashboardStats, getDashboardActivityTrends, getDashboardLinkStatusTrends } from "@/lib/api/dashboard/route";
import { generateDateLabels } from "@/lib/utils/chartDataGenerator";

import ClientDashboard from "./components/ClientDashboard";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_KEY);
  const hasSessionToken = !!sessionToken && !!sessionToken.value;

  if (!hasSessionToken) {
    redirect('/login');
  }

  const stats = await getDashboardStats();
  const activityTrends = await getDashboardActivityTrends();
  const linkStatusTrends = await getDashboardLinkStatusTrends();
  
  const chartLabels = generateDateLabels(30);

  if (!stats) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <ClientDashboard
      stats={stats}
      activityTrends={activityTrends}
      linkStatusTrends={linkStatusTrends}
      chartLabels={chartLabels}
    />
  )
}

export default Dashboard;