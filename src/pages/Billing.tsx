import { CreditCard, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

const plans = [
  { id: "starter", name: "Starter", price: "₹2,999", period: "/mo", features: ["Up to 50 clients", "Basic analytics", "Email support", "1 RM seat"] },
  { id: "pro", name: "Professional", price: "₹7,999", period: "/mo", features: ["Up to 250 clients", "Advanced analytics", "AI Assistant", "5 RM seats", "API access"], popular: true },
  { id: "enterprise", name: "Enterprise", price: "₹19,999", period: "/mo", features: ["Unlimited clients", "Custom analytics", "Priority AI", "Unlimited seats", "Dedicated support", "Custom integrations"] },
];

export default function Billing() {
  const [selected, setSelected] = useState("pro");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cashfree, setCashfree] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // 1. Check for redirection order_id in URL
    const orderId = searchParams.get("order_id");
    if (orderId) {
      verifyPayment(orderId);
    }

    // 2. Dynamically load Cashfree SDK
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      if ((window as any).Cashfree) {
        setCashfree((window as any).Cashfree({ mode: "sandbox" }));
      }
    };
    document.body.appendChild(script);

    return () => {
      if(document.body.contains(script)){
         document.body.removeChild(script);
      }
    };
  }, []);

  const verifyPayment = async (orderId: string) => {
    setVerifying(true);
    try {
      const response = await api.get<any>(`/billing/verify/${orderId}`);
      if (response.success && response.status === "PAID") {
        toast.success("Payment successful! Your account has been upgraded.");
      } else {
        toast.error(`Payment Status: ${response.status || "FAILED"}. ${response.message || ""}`);
      }
    } catch (error: any) {
      toast.error("Failed to verify payment status.");
    } finally {
      setVerifying(false);
      // Clean URL params
      setSearchParams({});
    }
  };

  const handleUpgrade = async () => {
    if (!cashfree) {
      toast.error("Payment gateway is loading...");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post<any>("/billing/checkout", { planId: selected });
      
      if (response.success && response.data.payment_session_id) {
        cashfree.checkout({
          paymentSessionId: response.data.payment_session_id,
          redirectTarget: "_self"
        });
      } else {
        toast.error(response.error || "Failed to initiate payment");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <h2 className="text-xl font-semibold">Verifying Payment...</h2>
        <p className="text-muted-foreground text-sm">Please do not close this window.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Subscription & Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Select a plan to upgrade your wealth management practice.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={cn(
              "glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-md active:scale-[0.98]",
              selected === plan.id && "ring-2 ring-primary shadow-md",
              plan.popular && "relative"
            )}
          >
            {plan.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-primary text-primary-foreground px-3 py-0.5 rounded-full">
                Popular
              </span>
            )}
            <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
            <div className="mt-2 mb-5">
              <span className="text-3xl font-bold text-foreground tab-nums">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6 border-t border-border animate-slide-up" style={{ animationDelay: "300ms" }}>
        <button 
          onClick={handleUpgrade}
          disabled={loading || !cashfree}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <CreditCard className="w-5 h-5" />
          {loading ? "Initializing..." : `Upgrade to ${plans.find(p => p.id === selected)?.name}`}
        </button>
      </div>
    </div>
  );
}
