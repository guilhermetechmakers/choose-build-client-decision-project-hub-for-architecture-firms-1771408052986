import { FolderOpen, FileText, Upload, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const mockFolders = [
  { id: "1", name: "Drawings", count: 12 },
  { id: "2", name: "Specs", count: 5 },
  { id: "3", name: "Decisions", count: 8 },
];

const mockFiles = [
  { id: "1", name: "A-101 Floor Plan.pdf", size: "2.4 MB", linked: true },
  { id: "2", name: "S-001 Spec Section.pdf", size: "1.1 MB", linked: false },
];

export function FilesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Files & Drawings</h1>
          <p className="text-muted-foreground">Project assets with versions and link-to-decision</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Input placeholder="Search files…" className="pl-9" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="font-semibold">Folders</h2>
          </CardHeader>
          <CardContent className="space-y-1">
            {mockFolders.map((f) => (
              <button
                key={f.id}
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
              >
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 truncate">{f.name}</span>
                <span className="text-muted-foreground">{f.count}</span>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-semibold">Files</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockFiles.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
                >
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.size}</p>
                  </div>
                  {f.linked && (
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <Link2 className="h-3 w-3" /> Linked
                    </span>
                  )}
                  <Button variant="ghost" size="sm">Preview</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
