import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  MessageSquare,
  FileText,
  Calendar,
  LayoutTemplate,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SIDEBAR_STORAGE_KEY = "choose-build-sidebar-collapsed";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { to: "/dashboard/decisions", label: "Decision Log", icon: ClipboardList },
  { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { to: "/dashboard/files", label: "Files & Drawings", icon: FileText },
  { to: "/dashboard/meetings", label: "Meetings", icon: Calendar },
  { to: "/dashboard/templates", label: "Templates", icon: LayoutTemplate },
  { to: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

const bottomItems = [
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
    } catch {
      /* no-op */
    }
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-64"
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-14 items-center gap-2 border-b border-border px-3">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
            <span className="text-primary">Choose</span>&<span className="text-accent">Build</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2" aria-label="Sidebar navigation">
        {!collapsed && (
          <div className="px-2 py-2">
            <Button variant="default" size="sm" className="w-full gap-2" asChild>
              <Link to="/dashboard/decisions/new">
                <Plus className="h-4 w-4" />
                New decision
              </Link>
            </Button>
          </div>
        )}
        {collapsed && (
          <Button variant="ghost" size="icon" className="w-full" asChild>
            <Link to="/dashboard/decisions/new" aria-label="New decision">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        )}
        <Separator className="my-1" />
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to || (to !== "/dashboard" && location.pathname.startsWith(to));
          return (
            <Link key={to} to={to}>
              <span
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none",
                  collapsed ? "justify-center px-0" : "",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </span>
            </Link>
          );
        })}
        <div className="mt-auto">
          <Separator className="my-1" />
          {bottomItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link key={to} to={to}>
                <span
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none",
                    collapsed ? "justify-center px-0" : "",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  title={collapsed ? label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
