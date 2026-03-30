import { ShieldAlert } from "lucide-react";
import { mockCompliance } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  overdue: "bg-red-100 text-red-700",
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const typeLabel: Record<string, string> = {
  kyc_renewal: "KYC Renewal",
  risk_profile: "Risk Profile",
  nomination: "Nomination",
};

export function ComplianceAlerts() {
  const alerts = mockCompliance
    .filter((c) => c.status !== "completed")
    .sort((a, b) => (a.status === "overdue" ? -1 : 1));

  return (
    <div className="widget-card">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="w-4 h-4 text-destructive" />
        <h3 className="text-sm font-semibold text-foreground">Compliance Alerts</h3>
        <span className="ml-auto text-xs text-destructive font-medium">{alerts.filter(a => a.status === "overdue").length} overdue</span>
      </div>
      <div className="space-y-2.5">
        {alerts.map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{task.clientName}</p>
              <p className="text-xs text-muted-foreground">{typeLabel[task.type]} · Due {new Date(task.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
            </div>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize", statusStyle[task.status])}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
