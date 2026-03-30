import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart3, Users, TrendingUp } from "lucide-react";

const rmPerformance = [
  { name: "Priya S.", aum: 62.7, clients: 3 },
  { name: "Arjun N.", aum: 89.9, clients: 2 },
  { name: "Vikram P.", aum: 37.3, clients: 3 },
];

const productData = [
  { name: "Mutual Funds", value: 40, color: "hsl(168, 55%, 28%)" },
  { name: "Direct Equity", value: 25, color: "hsl(220, 70%, 55%)" },
  { name: "Fixed Deposits", value: 15, color: "hsl(36, 90%, 55%)" },
  { name: "Insurance", value: 12, color: "hsl(280, 60%, 55%)" },
  { name: "Others", value: 8, color: "hsl(220, 10%, 70%)" },
];

const flowData = [
  { month: "Oct", inflow: 3.2, outflow: 1.1 },
  { month: "Nov", inflow: 2.8, outflow: 1.5 },
  { month: "Dec", inflow: 4.1, outflow: 0.9 },
  { month: "Jan", inflow: 3.5, outflow: 1.3 },
  { month: "Feb", inflow: 2.9, outflow: 1.0 },
  { month: "Mar", inflow: 3.8, outflow: 0.8 },
];

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance insights and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* RM Leaderboard */}
        <div className="widget-card animate-reveal animate-reveal-delay-1">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">RM Leaderboard</h3>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rmPerformance} layout="vertical">
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220,10%,46%)" }} tickFormatter={(v) => `₹${v}Cr`} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(220,25%,12%)" }} width={70} />
                <Tooltip formatter={(value: number) => [`₹${value}Cr`, "AUM"]} contentStyle={{ background: "white", border: "1px solid hsl(220,15%,90%)", borderRadius: "12px", fontSize: "12px" }} />
                <Bar dataKey="aum" fill="hsl(168, 55%, 28%)" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Allocation */}
        <div className="widget-card animate-reveal animate-reveal-delay-2">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Product Allocation</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={productData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                    {productData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {productData.map((item) => (
                <div key={item.name} className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground w-24">{item.name}</span>
                  <span className="text-xs font-semibold text-foreground tab-nums">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inflow/Outflow */}
        <div className="widget-card lg:col-span-2 animate-slide-up" style={{ animationDelay: "250ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Inflow vs Outflow</h3>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={flowData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220,10%,46%)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220,10%,46%)" }} tickFormatter={(v) => `₹${v}Cr`} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(220,15%,90%)", borderRadius: "12px", fontSize: "12px" }} />
                <Bar dataKey="inflow" fill="hsl(168, 55%, 28%)" radius={[6, 6, 0, 0]} barSize={20} name="Inflow" />
                <Bar dataKey="outflow" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} barSize={20} name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
