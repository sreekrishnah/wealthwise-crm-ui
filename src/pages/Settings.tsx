import { Settings as SettingsIcon, Building2, Users, GitBranch, CreditCard } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "org", label: "Organization", icon: Building2 },
  { key: "users", label: "Users & Roles", icon: Users },
  { key: "pipeline", label: "Pipeline Stages", icon: GitBranch },
  { key: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [active, setActive] = useState("org");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your workspace configuration</p>
      </div>

      <div className="flex gap-1 border-b border-border/50 animate-reveal animate-reveal-delay-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative",
              active === tab.key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {active === tab.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <p className="text-sm text-muted-foreground text-center py-8">
          {tabs.find(t => t.key === active)?.label} settings — coming soon
        </p>
      </div>
    </div>
  );
}
