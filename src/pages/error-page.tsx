import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
        <h1 className="text-2xl font-bold text-foreground mt-4">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">We’re sorry. Please try again or go back home.</p>
        <div className="flex gap-2 justify-center mt-6">
          <Button onClick={() => window.location.reload()}>Retry</Button>
          <Button variant="outline" asChild>
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
