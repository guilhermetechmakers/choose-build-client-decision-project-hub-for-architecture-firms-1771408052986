import { Calendar, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockMeetings = [
  { id: "1", title: "Design review", project: "Riverside Residence", date: "Feb 20, 2025", time: "10:00 AM", hasAgenda: true },
  { id: "2", title: "Client sign-off", project: "Downtown Office", date: "Feb 22, 2025", time: "2:00 PM", hasAgenda: false },
];

export function MeetingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meetings & Agendas</h1>
          <p className="text-muted-foreground">Schedule meetings and capture minutes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New meeting
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold">Upcoming</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {mockMeetings.map((m) => (
              <li
                key={m.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{m.project}</p>
                  </div>
                </div>
                <div className="sm:ml-auto flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{m.date} · {m.time}</span>
                  {m.hasAgenda ? (
                    <Badge variant="secondary" className="gap-1">
                      <FileText className="h-3 w-3" /> Agenda
                    </Badge>
                  ) : (
                    <Button variant="outline" size="sm">Add agenda</Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
