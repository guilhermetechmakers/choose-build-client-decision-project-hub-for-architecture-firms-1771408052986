import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileCheck, MessageSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      <header className="relative z-10 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="text-primary">Choose</span>&<span className="text-accent">Build</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Button asChild>
            <Link to="/signup">Get started</Link>
          </Button>
        </nav>
      </header>
      <main className="relative z-10">
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in-up">
              Centralize decisions.
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Reduce scope creep.
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              The project management and client-decision platform for architecture firms. One source of truth from kickoff to handover—with audit-ready records for every approval.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="gap-2" asChild>
                <Link to="/signup">
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">View demo</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="border-t border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-center text-foreground mb-12">
              Built for architecture teams and their clients
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: FileCheck, title: "Decision Log", desc: "Structured cards with options, cost deltas, and recommendations." },
                { icon: CheckCircle2, title: "Audit trail", desc: "Immutable versions and timestamped approvals." },
                { icon: MessageSquare, title: "Contextual messaging", desc: "Threads tied to decisions and drawings." },
                { icon: BarChart3, title: "Reports & handover", desc: "Pending approvals, SLAs, exportable packages." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className={cn(
                    "rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5",
                    "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${0.1 * (i + 3)}s` }}
                >
                  <div className="rounded-lg bg-primary/10 p-3 w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-foreground">Ready to get started?</h2>
            <p className="mt-2 text-muted-foreground">Join architecture firms that ship on time with clear client sign-off.</p>
            <Button size="lg" className="mt-6 gap-2" asChild>
              <Link to="/signup">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">© Choose & Build. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
