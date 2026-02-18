import { Link } from "react-router-dom";
import { Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EmailVerificationPage() {
  const verified = false;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md animate-fade-in-up">
        <CardHeader className="text-center">
          {verified ? (
            <>
              <div className="mx-auto rounded-full bg-success/15 p-3 w-fit">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <CardTitle>Email verified</CardTitle>
              <CardDescription>Your email is confirmed. You can now sign in.</CardDescription>
            </>
          ) : (
            <>
              <div className="mx-auto rounded-full bg-primary/10 p-3 w-fit">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Verify your email</CardTitle>
              <CardDescription>
                We sent a verification link. Click it to confirm your address. Check spam if you don&apos;t see it.
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {!verified && (
            <Button variant="outline" className="w-full" disabled>
              Resend email (cooldown)
            </Button>
          )}
          <Button asChild className="w-full">
            <Link to={verified ? "/login" : "/"}>
              {verified ? "Sign in" : "Back to home"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
