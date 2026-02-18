import { LayoutTemplate, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const mockTemplates = [
  { id: "1", name: "Residential — Single family", phases: 7, decisions: 12 },
  { id: "2", name: "Commercial — Tenant improvement", phases: 6, decisions: 8 },
];

export function TemplatesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground">Reusable project and decision templates</p>
        </div>
        <Button disabled>
          <Plus className="h-4 w-4 mr-2" />
          New template
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockTemplates.map((t) => (
          <Card
            key={t.id}
            className="transition-all duration-300 hover:shadow-card-hover hover:border-primary/30"
          >
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <LayoutTemplate className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t.phases} phases · {t.decisions} decision sets
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Use template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
