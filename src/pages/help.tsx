import { HelpCircle, BookOpen, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const faqs = [
  { q: "How do I publish a decision?", a: "Go to Decision Log → Create decision. Complete the multi-step form (info, options, cost, audience) and click Publish." },
  { q: "Can clients approve from email?", a: "Clients receive an email with a link to the decision card. They can approve or request changes in the portal." },
  { q: "How is the audit trail stored?", a: "Every published version and approval is stored with a timestamp and user. Export the handover package for a full audit bundle." },
];

export function HelpPage() {
  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help</h1>
        <p className="text-muted-foreground">FAQs and support</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            FAQs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <p className="font-medium text-foreground">{q}</p>
              <p className="text-sm text-muted-foreground mt-1">{a}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Guides
          </CardTitle>
          <p className="text-sm text-muted-foreground">Getting started and onboarding</p>
        </CardHeader>
        <CardContent>
          <Button variant="outline">View guides</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Brief description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Describe your issue…"
              />
            </div>
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
