import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockDecisions = [
  { id: "1", title: "Kitchen finishes", status: "approved", costDelta: 0, project: "Riverside Residence", updatedAt: "2h ago", thumbnailUrl: null },
  { id: "2", title: "Exterior cladding", status: "pending", costDelta: 12000, project: "Riverside Residence", updatedAt: "5h ago", thumbnailUrl: null },
  { id: "3", title: "Flooring options", status: "changes_requested", costDelta: -2000, project: "Downtown Office", updatedAt: "1d ago", thumbnailUrl: null },
];

const statusVariant: Record<string, "default" | "success" | "warning" | "secondary"> = {
  approved: "success",
  pending: "warning",
  changes_requested: "secondary",
  draft: "default",
};

export function DecisionLogPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = mockDecisions.filter((d) => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Decision Log</h1>
          <p className="text-muted-foreground">Review and manage decision cards</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/decisions/new">Create decision</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search decisions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["pending", "approved", "changes_requested"].map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === s ? null : s)}
            >
              {s.replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground">No decisions match your filters.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link to="/dashboard/decisions/new">Create first decision</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filtered.map((d) => (
            <Link key={d.id} to={`/dashboard/decisions/${d.id}`}>
              <Card className="transition-all duration-300 hover:shadow-card-hover hover:border-primary/30">
                <CardContent className="flex flex-row items-center gap-4 p-4">
                  <div className="h-14 w-20 shrink-0 rounded border border-border bg-muted" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{d.title}</p>
                    <p className="text-sm text-muted-foreground">{d.project} · {d.updatedAt}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {d.costDelta !== undefined && d.costDelta !== 0 && (
                      <Badge variant="outline">
                        {d.costDelta > 0 ? "+" : ""}${Math.abs(d.costDelta).toLocaleString()}
                      </Badge>
                    )}
                    <Badge variant={statusVariant[d.status] ?? "default"}>
                      {d.status.replace("_", " ")}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
