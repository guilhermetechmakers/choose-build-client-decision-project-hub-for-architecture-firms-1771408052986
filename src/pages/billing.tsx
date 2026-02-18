import { CreditCard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BillingPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground">Subscription and payment management</p>
      </div>

      <Tabs defaultValue="plan">
        <TabsList>
          <TabsTrigger value="plan">Plan</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="plan" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Team — $49/month per seat</p>
              <p className="text-sm text-muted-foreground mt-1">5 seats · Next billing: Mar 1, 2025</p>
              <Button variant="outline" className="mt-4">Change plan</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoice history
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span>Feb 1, 2025</span>
                  <span className="text-muted-foreground">$245.00</span>
                  <Button variant="ghost" size="sm">Download</Button>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span>Jan 1, 2025</span>
                  <span className="text-muted-foreground">$245.00</span>
                  <Button variant="ghost" size="sm">Download</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
