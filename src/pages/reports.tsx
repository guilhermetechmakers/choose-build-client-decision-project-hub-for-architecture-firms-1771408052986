import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockTrend = [
  { week: "W1", pending: 5, approved: 3 },
  { week: "W2", pending: 4, approved: 6 },
  { week: "W3", pending: 3, approved: 5 },
  { week: "W4", pending: 2, approved: 8 },
];

export function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Project health and approval KPIs</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Pending approvals", value: "3", sub: "Across 2 projects" },
          { label: "Avg. approval time", value: "2.4d", sub: "Last 30 days" },
          { label: "Decisions this month", value: "8", sub: "5 approved" },
          { label: "On track", value: "100%", sub: "No delays" },
        ].map(({ label, value, sub }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">{value}</span>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval trend</CardTitle>
          <p className="text-sm text-muted-foreground">Pending vs approved by week</p>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area type="monotone" dataKey="pending" stroke="rgb(var(--warning))" fill="rgb(var(--warning) / 0.2)" />
                <Area type="monotone" dataKey="approved" stroke="rgb(var(--success))" fill="rgb(var(--success) / 0.2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
