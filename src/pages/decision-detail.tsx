import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function DecisionDetailPage() {
  useParams<{ decisionId: string }>();
  const status = "pending";

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/decisions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Exterior cladding</h1>
          <p className="text-muted-foreground">Riverside Residence · v1</p>
        </div>
        <Badge variant="warning">{status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {["Option A: Metal panel", "Option B: Wood (recommended)"].map((opt, i) => (
                  <div
                    key={opt}
                    className={cn(
                      "rounded-lg border-2 p-4 transition-colors",
                      i === 1 ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <div className="h-32 rounded bg-muted mb-2" />
                    <p className="font-medium">{opt}</p>
                    {i === 1 && (
                      <span className="inline-flex items-center gap-1 text-sm text-primary mt-1">
                        <Check className="h-4 w-4" /> Recommended
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Option B: +$12,000 vs baseline</p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full gap-2">
                <Check className="h-4 w-4" />
                Approve
              </Button>
              <Button variant="outline" className="w-full">Request changes</Button>
            </CardContent>
          </Card>
          <Tabs defaultValue="comments">
            <TabsList className="w-full">
              <TabsTrigger value="comments" className="gap-1">
                <MessageSquare className="h-4 w-4" /> Comments
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-1">
                <FileText className="h-4 w-4" /> History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="comments" className="mt-2">
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            </TabsContent>
            <TabsContent value="history" className="mt-2">
              <p className="text-sm text-muted-foreground">Published 5h ago · v1</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
