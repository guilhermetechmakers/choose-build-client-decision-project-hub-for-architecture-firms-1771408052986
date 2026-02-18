import { useState } from "react";
import { MessageSquare, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockThreads = [
  { id: "1", subject: "Kitchen finishes — Option B", context: "Decision · Riverside", preview: "Client asked about lead time…", unread: true },
  { id: "2", subject: "Exterior cladding", context: "Decision · Riverside", preview: "Approved Option B.", unread: false },
];

export function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 animate-fade-in">
      <Card className="w-full max-w-sm shrink-0 flex flex-col">
        <CardHeader>
          <h2 className="font-semibold">Threads</h2>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-0">
          <ul>
            {mockThreads.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(t.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-border hover:bg-muted transition-colors",
                    selectedId === t.id && "bg-muted"
                  )}
                >
                  <p className="font-medium text-sm truncate">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.context}</p>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">{t.preview}</p>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="flex-1 flex flex-col min-w-0">
        {selectedId ? (
          <>
            <CardHeader className="border-b border-border">
              <p className="font-medium">{mockThreads.find((t) => t.id === selectedId)?.subject}</p>
              <p className="text-sm text-muted-foreground">Context: Decision</p>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto py-4">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="rounded-lg bg-primary/10 text-primary px-3 py-2 max-w-[80%]">
                    <p className="text-sm">Client asked about lead time for Option B.</p>
                    <p className="text-xs text-muted-foreground mt-1">2h ago</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="rounded-lg bg-muted px-3 py-2 max-w-[80%]">
                    <p className="text-sm">Option B is 4–6 weeks. We can lock the order once approved.</p>
                    <p className="text-xs text-muted-foreground mt-1">1h ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="p-4 border-t border-border flex gap-2">
              <Button variant="ghost" size="icon" aria-label="Attach">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Reply…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" className="gap-1">
                <Send className="h-4 w-4" /> Send
              </Button>
            </div>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Select a thread</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
