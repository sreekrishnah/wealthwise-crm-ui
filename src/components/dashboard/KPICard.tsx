import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: ReactNode;
  className?: string;
}

export function KPICard({ label, value, change, changeLabel, icon, className }: KPICardProps) {
  const positive = change >= 0;

  return (
    <div className={cn("kpi-card", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
        )}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tab-nums tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{changeLabel}</p>
      <p className="text-[11px] text-muted-foreground/70 mt-0.5">{label}</p>
    </div>
  );
}
