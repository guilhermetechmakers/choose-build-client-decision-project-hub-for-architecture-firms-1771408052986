import { Link } from "react-router-dom";
import { Plus, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockProjects = [
  { id: "1", name: "Riverside Residence", status: "active", phase: "Schematic", pendingApprovals: 2 },
  { id: "2", name: "Downtown Office Fit-out", status: "active", phase: "DD", pendingApprovals: 1 },
  { id: "3", name: "Lake House", status: "on_hold", phase: "Concept", pendingApprovals: 0 },
];

export function ProjectsListPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage project timeline and phases</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/projects/new" className="gap-2">
            <Plus className="h-4 w-4" />
            New project
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((p) => (
          <Link key={p.id} to={`/dashboard/projects/${p.id}`}>
            <Card className="h-full transition-all duration-300 hover:shadow-card-hover hover:border-primary/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <FolderKanban className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.phase}</p>
                    <div className="mt-2 flex gap-2">
                      <Badge variant={p.status === "active" ? "default" : "secondary"}>
                        {p.status}
                      </Badge>
                      {p.pendingApprovals > 0 && (
                        <Badge variant="warning">{p.pendingApprovals} pending</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
