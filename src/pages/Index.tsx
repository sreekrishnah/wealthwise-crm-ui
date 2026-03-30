import {
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShieldAlert,
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChurnRiskWidget } from "@/components/dashboard/ChurnRiskWidget";
import { UpcomingReviews } from "@/components/dashboard/UpcomingReviews";
import { ComplianceAlerts } from "@/components/dashboard/ComplianceAlerts";
import { AUMChart } from "@/components/dashboard/AUMChart";
import { formatCurrency, totalAUM } from "@/data/mock-data";
import { useDashboardData } from "@/hooks/use-data";

export default function Dashboard() {
  const { data: dashboard, isLoading } = useDashboardData();

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>;

  const aum = dashboard?.aum?.totalAUM || totalAUM;
  const metrics = dashboard?.metrics || { revenueLast30Days: 0, newClientsLast30Days: 2, churnRiskClients: 2, complianceOverdue: 2 };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Wealth Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Good morning. Here's your portfolio overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="animate-reveal">
          <KPICard
            label="Total AUM"
            value={formatCurrency(aum)}
            change={4.2}
            changeLabel="vs last month"
            icon={<IndianRupee className="w-5 h-5 text-primary" />}
          />
        </div>
        <div className="animate-reveal animate-reveal-delay-1">
          <KPICard
            label="Inflows"
            value={formatCurrency(metrics.revenueLast30Days || 0)}
            change={12.5}
            changeLabel="this month"
            icon={<ArrowUpRight className="w-5 h-5 text-primary" />}
          />
        </div>
        <div className="animate-reveal animate-reveal-delay-2">
          <KPICard
            label="Clients at Risk"
            value={metrics.churnRiskClients.toString()}
            change={-1}
            changeLabel="vs last month"
            icon={<Users className="w-5 h-5 text-primary" />}
          />
        </div>
        <div className="animate-reveal animate-reveal-delay-3">
          <KPICard
            label="Compliance Overdue"
            value={metrics.complianceOverdue.toString()}
            change={-33}
            changeLabel="vs last month"
            icon={<ShieldAlert className="w-5 h-5 text-primary" />}
          />
        </div>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <AUMChart />
        <ChurnRiskWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "350ms" }}>
        <UpcomingReviews />
        <ComplianceAlerts />
      </div>
    </div>
  );
}
