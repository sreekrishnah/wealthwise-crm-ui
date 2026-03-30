import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Sep", aum: 165 },
  { month: "Oct", aum: 172 },
  { month: "Nov", aum: 168 },
  { month: "Dec", aum: 178 },
  { month: "Jan", aum: 182 },
  { month: "Feb", aum: 186 },
  { month: "Mar", aum: 190 },
];

export function AUMChart() {
  return (
    <div className="widget-card col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">AUM Trend</h3>
        <span className="ml-auto text-xs text-muted-foreground">Last 7 months</span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(168, 55%, 28%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(168, 55%, 28%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220,10%,46%)" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220,10%,46%)" }} tickFormatter={(v) => `₹${v}Cr`} />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid hsl(220,15%,90%)",
                borderRadius: "12px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              formatter={(value: number) => [`₹${value}Cr`, "AUM"]}
            />
            <Area
              type="monotone"
              dataKey="aum"
              stroke="hsl(168, 55%, 28%)"
              strokeWidth={2}
              fill="url(#aumGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
