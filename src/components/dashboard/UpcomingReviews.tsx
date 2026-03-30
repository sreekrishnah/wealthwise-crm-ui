import { Calendar } from "lucide-react";
import { mockReviews } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  missed: "bg-red-100 text-red-700",
};

export function UpcomingReviews() {
  const upcoming = mockReviews
    .filter((r) => r.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="widget-card">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Upcoming Reviews</h3>
        <span className="ml-auto text-xs text-muted-foreground">{upcoming.length} pending</span>
      </div>
      <div className="space-y-2.5">
        {upcoming.map((review) => (
          <div key={review.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center text-xs font-bold text-primary tab-nums">
              {new Date(review.date).getDate()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{review.clientName}</p>
              <p className="text-xs text-muted-foreground">{review.rmName}</p>
            </div>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize", statusStyle[review.status])}>
              {review.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
