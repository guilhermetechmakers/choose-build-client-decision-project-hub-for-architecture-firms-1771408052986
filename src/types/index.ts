export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "admin" | "pm" | "architect" | "client" | "contractor";
}

export interface Project {
  id: string;
  name: string;
  status: "active" | "on_hold" | "completed";
  phase: string;
  progress: number;
  pendingApprovals: number;
  updatedAt: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  imageUrl?: string;
  costDelta?: number;
  recommended?: boolean;
}

export interface Decision {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "draft" | "pending" | "approved" | "changes_requested";
  options: DecisionOption[];
  costDelta?: number;
  recommendedOptionId?: string;
  publishedAt?: string;
  approvedAt?: string;
  version: number;
  thumbnailUrl?: string;
}
