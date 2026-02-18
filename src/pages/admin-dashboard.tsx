import { Link } from "react-router-dom";
import { Users, LayoutTemplate, CreditCard, Shield, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { to: "/dashboard/admin/users", label: "User management", icon: Users, desc: "Invite users, roles" },
  { to: "/dashboard/admin/templates", label: "Templates", icon: LayoutTemplate, desc: "Firm templates" },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCard, desc: "Plan and invoices" },
  { to: "/dashboard/admin/security", label: "Security", icon: Shield, desc: "SSO, 2FA, audit logs" },
  { to: "/dashboard/admin/audit", label: "Audit logs", icon: FileText, desc: "Activity history" },
];

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin</h1>
        <p className="text-muted-foreground">Firm-level controls and settings</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminLinks.map(({ to, label, icon: Icon, desc }) => (
          <Link key={to} to={to}>
            <Card className="h-full transition-all duration-300 hover:shadow-card-hover hover:border-primary/30">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                <Button variant="ghost" size="sm" className="mt-2 px-0">Open</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
