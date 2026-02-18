import { Link } from "react-router-dom";
import { FolderKanban, ClipboardList, Calendar, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const mockProjects = [
  { id: "1", name: "Riverside Residence", status: "active", phase: "Schematic", progress: 60, pendingApprovals: 2, updatedAt: "2 hours ago" },
  { id: "2", name: "Downtown Office Fit-out", status: "active", phase: "DD", progress: 35, pendingApprovals: 1, updatedAt: "1 day ago" },
];

const mockActivity = [
  { id: "1", text: "Decision “Kitchen finishes” approved", project: "Riverside Residence", time: "2h ago" },
  { id: "2", text: "New decision published: “Exterior cladding”", project: "Riverside Residence", time: "5h ago" },
  { id: "3", text: "Meeting scheduled: Design review", project: "Downtown Office Fit-out", time: "1d ago" },
];

export function DashboardOverviewPage() {
  const isLoading = false;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your projects and pending approvals</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active projects", value: "2", icon: FolderKanban, trend: null },
          { label: "Pending approvals", value: "3", icon: ClipboardList, trend: "2 this week" },
          { label: "Decisions this month", value: "8", icon: ClipboardList, trend: null },
          { label: "Upcoming meetings", value: "2", icon: Calendar, trend: "This week" },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="transition-all duration-300 hover:shadow-card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <span className="text-2xl font-bold">{value}</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Projects</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/projects">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {mockProjects.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/dashboard/projects/${p.id}`}
                      className={cn(
                        "flex items-center justify-between rounded-lg border border-border p-4 transition-all duration-200 hover:shadow-card hover:border-primary/30"
                      )}
                    >
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.phase} · {p.progress}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {p.pendingApprovals > 0 && (
                          <Badge variant="warning">{p.pendingApprovals} pending</Badge>
                        )}
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <ul className="space-y-4">
                {mockActivity.map((a) => (
                  <li key={a.id} className="flex gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-foreground">{a.text}</p>
                      <p className="text-muted-foreground">{a.project} · {a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
