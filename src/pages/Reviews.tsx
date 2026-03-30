import { useReviews } from "@/hooks/use-data";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";

const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
  scheduled: { icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
  completed: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
  missed: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
};

export default function Reviews() {
  const { data: reviews, isLoading } = useReviews();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const reviewList = reviews || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-1">Client review schedule and history</p>
      </div>

      <div className="space-y-3 animate-slide-up" style={{ animationDelay: "150ms" }}>
        {reviewList.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground glass-card rounded-2xl">
            No reviews found.
          </div>
        ) : (
          reviewList.map((review: any) => {
            const status = review.status || "scheduled";
            const cfg = statusConfig[status] || statusConfig.scheduled;
            const Icon = cfg.icon;
            return (
              <div key={review.id || review._id} className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", cfg.bg)}>
                  <Icon className={cn("w-5 h-5", cfg.color)} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{review.clientName}</p>
                  <p className="text-xs text-muted-foreground">{review.rmName} {review.notes && `· ${review.notes}`}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground tab-nums flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    {new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <p className={cn("text-[10px] font-semibold mt-0.5 capitalize", cfg.color)}>{status}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
