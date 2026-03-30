import { useClients } from "@/hooks/use-data";
import { cn } from "@/lib/utils";
import type { PipelineStage } from "@/types/wealth";
import { Loader2 } from "lucide-react";

const stages: { key: PipelineStage; label: string; color: string }[] = [
  { key: "prospect", label: "Prospect", color: "bg-blue-500" },
  { key: "kyc_done", label: "KYC Done", color: "bg-amber-500" },
  { key: "active", label: "Active", color: "bg-emerald-500" },
  { key: "premium", label: "Premium", color: "bg-primary" },
  { key: "at_risk", label: "At Risk", color: "bg-destructive" },
];

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
};

export default function Pipeline() {
  const { data: clients, isLoading } = useClients();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const clientList = clients || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">AUM Pipeline</h1>
        <p className="text-sm text-muted-foreground mt-1">Track clients through their lifecycle stages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
        {stages.map((stage) => {
          const stageClients = clientList.filter((c: any) => c.pipelineStage === stage.key);
          return (
            <div key={stage.key} className="glass-card rounded-2xl p-4 flex flex-col min-h-[400px]">
              <div className="flex items-center gap-2 mb-4">
                <div className={cn("w-2 h-2 rounded-full", stage.color)} />
                <h3 className="text-sm font-semibold text-foreground">{stage.label}</h3>
                <span className="ml-auto text-xs text-muted-foreground">{stageClients.length}</span>
              </div>
              <div className="space-y-2.5 flex-1">
                {stageClients.map((client: any) => (
                  <div key={client.id || client._id} className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer active:scale-[0.97] border border-border/10">
                    <p className="text-sm font-medium text-foreground">{client.name}</p>
                    <p className="text-xs text-muted-foreground tab-nums mt-1 font-semibold">{formatCurrency(client.aum)}</p>
                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-border/5">
                        <p className="text-[9px] text-muted-foreground uppercase">{client.segment}</p>
                        <p className="text-[9px] text-muted-foreground font-medium">{client.rmName}</p>
                    </div>
                  </div>
                ))}
                {stageClients.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-6">No clients</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
