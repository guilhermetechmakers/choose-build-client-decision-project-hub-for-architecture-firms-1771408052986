import { useParams, Link } from "react-router-dom";
import { GanttChart, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const phases = [
  { id: "kickoff", name: "Kickoff", progress: 100, decisions: 2 },
  { id: "concept", name: "Concept", progress: 100, decisions: 3 },
  { id: "schematic", name: "Schematic", progress: 70, decisions: 2 },
  { id: "dd", name: "DD", progress: 20, decisions: 1 },
  { id: "permitting", name: "Permitting", progress: 0, decisions: 0 },
  { id: "ca", name: "CA", progress: 0, decisions: 0 },
  { id: "handover", name: "Handover", progress: 0, decisions: 0 },
];

export function ProjectBoardPage() {
  useParams<{ projectId: string }>();
  const showGantt = false;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Project timeline</h1>
          <p className="text-muted-foreground">Riverside Residence — phases and decision checkpoints</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <GanttChart className="h-4 w-4 mr-1" />
            {showGantt ? "Timeline" : "Gantt"}
          </Button>
          <Button size="sm" asChild>
            <Link to="/dashboard/decisions/new">
              <Plus className="h-4 w-4 mr-1" />
              Add milestone
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="flex min-w-max divide-x divide-border">
              {phases.map((phase) => (
                <div
                  key={phase.id}
                  className="flex flex-col w-36 shrink-0"
                >
                  <div className="border-b border-border p-3 text-center">
                    <p className="font-medium text-sm text-foreground">{phase.name}</p>
                    <p className="text-xs text-muted-foreground">{phase.progress}%</p>
                  </div>
                  <div className="flex-1 p-2 space-y-1 min-h-[120px]">
                    {phase.decisions > 0 && (
                      <>
                        {Array.from({ length: phase.decisions }).map((_, i) => (
                          <Link
                            key={i}
                            to={`/dashboard/decisions/${phase.id}-${i + 1}`}
                            className="block rounded border border-border bg-card p-2 text-xs hover:bg-muted transition-colors"
                          >
                            Decision checkpoint
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">7 phases</Badge>
        <Badge variant="outline">3 pending decisions</Badge>
      </div>
    </div>
  );
}
