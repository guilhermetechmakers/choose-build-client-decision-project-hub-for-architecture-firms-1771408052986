import { Link, useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const content: Record<string, { title: string; body: string }> = {
  privacy: {
    title: "Privacy Policy",
    body: "We collect and use your information to provide the Choose & Build service, improve our product, and communicate with you. We do not sell your data. We use industry-standard security and comply with applicable data protection laws.",
  },
  terms: {
    title: "Terms of Service",
    body: "By using Choose & Build you agree to these terms. You are responsible for your account and the content you publish. We reserve the right to suspend accounts that violate our policies. Contact us for questions.",
  },
  cookies: {
    title: "Cookie Policy",
    body: "We use essential cookies for authentication and preferences, and analytics cookies to improve the product. You can manage cookie preferences in your browser or contact us.",
  },
};

export function LegalPage() {
  const { type } = useParams<{ type: string }>();
  const location = useLocation();
  const slug = type ?? (location.pathname.replace("/", "") || "privacy");
  const key = slug in content ? slug : "privacy";
  const page = content[key];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="text-sm text-primary hover:underline mb-6 inline-block">Back to home</Link>
        <Card>
          <CardHeader>
            <CardTitle>{page.title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>{page.body}</p>
            <p className="text-muted-foreground mt-6">Last updated: February 2025. Contact: legal@chooseandbuild.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
