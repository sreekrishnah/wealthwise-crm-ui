import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GitBranch,
  Calendar,
  ShieldCheck,
  Target,
  BarChart3,
  Settings,
  CreditCard,
  ChevronLeft,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Clients", icon: Users, path: "/clients" },
  { label: "Portfolio", icon: Briefcase, path: "/portfolio" },
  { label: "Pipeline", icon: GitBranch, path: "/pipeline" },
  { label: "Reviews", icon: Calendar, path: "/reviews" },
  { label: "Compliance", icon: ShieldCheck, path: "/compliance" },
  { label: "Goals", icon: Target, path: "/goals" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Billing", icon: CreditCard, path: "/billing" },
];

export function AppSidebar() {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside
      className={cn(
        "glass-sidebar flex flex-col h-screen sticky top-0 transition-all duration-300 ease-out z-30",
        sidebarOpen ? "w-60" : "w-[68px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border/50">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        {sidebarOpen && (
          <span className="font-semibold text-foreground text-sm tracking-tight animate-fade-in">
            WealthIntel
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            "ml-auto p-1.5 rounded-lg hover:bg-muted transition-colors",
            !sidebarOpen && "ml-0 mt-2"
          )}
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-300",
              !sidebarOpen && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                "hover:bg-muted/80 active:scale-[0.97]",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="py-3 px-2 border-t border-border/50 space-y-0.5">
        {bottomItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                "hover:bg-muted/80 active:scale-[0.97]",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            "hover:bg-muted/80 active:scale-[0.97] text-muted-foreground justify-start"
          )}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
