import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Shield, TrendingUp } from "lucide-react";
import { mockClients, formatCurrency } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const tabs = ["Overview", "Portfolio", "Transactions", "Reviews", "Goals", "Compliance", "Timeline"];

const allocationData = [
  { name: "Equity", value: 45, color: "hsl(168, 55%, 28%)" },
  { name: "Debt", value: 25, color: "hsl(36, 90%, 55%)" },
  { name: "Gold", value: 15, color: "hsl(280, 60%, 55%)" },
  { name: "Real Estate", value: 10, color: "hsl(220, 70%, 55%)" },
  { name: "Cash", value: 5, color: "hsl(220, 10%, 70%)" },
];

const riskColors: Record<string, string> = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

export default function ClientDetail() {
  const { id } = useParams();
  const client = mockClients.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState("Overview");

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">Client not found</p>
        <Link to="/clients" className="text-primary text-sm mt-2 hover:underline">← Back to clients</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-reveal">
        <Link to="/clients" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to clients
        </Link>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
              {client.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-foreground">{client.name}</h1>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", riskColors[client.riskLevel])}>
                  {client.riskLevel} risk
                </span>
                <span className="text-xs font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">{client.segment}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {client.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {client.phone}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Since {new Date(client.joinedDate).getFullYear()}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground tab-nums">{formatCurrency(client.aum)}</p>
              <p className="text-xs text-muted-foreground">Assets Under Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border/50 animate-reveal animate-reveal-delay-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative",
              activeTab === tab
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stats */}
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Key Metrics
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Risk Score", value: `${client.riskScore}/100` },
                  { label: "KYC Status", value: client.kycStatus },
                  { label: "RM", value: client.rmName },
                  { label: "Next Review", value: new Date(client.nextReview).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
                  { label: "Pipeline", value: client.pipelineStage.replace("_", " ") },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground capitalize">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Allocation */}
            <div className="glass-card rounded-2xl p-5 lg:col-span-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-primary" /> Asset Allocation
              </h3>
              <div className="flex items-center gap-8">
                <div className="w-44 h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocationData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                        {allocationData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2.5">
                  {allocationData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground w-24">{item.name}</span>
                      <span className="text-sm font-semibold text-foreground tab-nums">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab !== "Overview" && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-muted-foreground text-sm">{activeTab} module — coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
