import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const step1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;

const steps = ["Info", "Options", "Cost & recommendation", "Audience & publish"];

export function CreateDecisionPage() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { title: "", description: "" },
  });

  const onStep1 = (_data: Step1Data) => {
    setStep(2);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/decisions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create decision</h1>
          <p className="text-muted-foreground">Multi-step publisher</p>
        </div>
      </div>

      <div className="flex gap-2">
        {steps.map((label, i) => (
          <div
            key={label}
            className={cn(
              "flex-1 rounded-md h-2 transition-colors",
              i + 1 <= step ? "bg-primary" : "bg-muted"
            )}
            aria-hidden
          />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Decision info</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onStep1)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Kitchen finishes"
                  className={cn(errors.title && "border-destructive")}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Brief context for the client"
                  {...register("description")}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  Next: Options
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Options & visuals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
              <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Drag and drop images or PDFs for each option</p>
              <Button variant="outline" className="mt-4">Upload options</Button>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" onClick={() => setStep(3)}>
                Next: Cost & recommendation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
