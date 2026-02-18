import { Navigate, useLocation } from "react-router-dom";
import type { User } from "@/types";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";

type UserRole = User["role"];

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Allowed roles; if empty or undefined, any authenticated user can access */
  allowedRoles?: UserRole[];
  /** Optional fallback while auth is loading */
  fallback?: React.ReactNode;
  className?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  fallback,
  className,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    if (fallback) return <>{fallback}</>;
    return (
      <div
        className={cn(
          "flex min-h-[40vh] items-center justify-center bg-background",
          className
        )}
        aria-busy="true"
        aria-label="Loading"
      >
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return (
      <Navigate
        to={returnUrl ? `/login?returnUrl=${returnUrl}` : "/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
