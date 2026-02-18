import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LandingPage } from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import { SignupPage } from "@/pages/signup";
import { PasswordResetPage } from "@/pages/password-reset";
import { EmailVerificationPage } from "@/pages/email-verification";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DashboardOverviewPage } from "@/pages/dashboard-overview";
import { ProjectsListPage } from "@/pages/projects-list";
import { ProjectBoardPage } from "@/pages/project-board";
import { DecisionLogPage } from "@/pages/decision-log";
import { DecisionDetailPage } from "@/pages/decision-detail";
import { CreateDecisionPage } from "@/pages/create-decision";
import { MessagesPage } from "@/pages/messages";
import { FilesPage } from "@/pages/files";
import { MeetingsPage } from "@/pages/meetings";
import { TemplatesPage } from "@/pages/templates";
import { ReportsPage } from "@/pages/reports";
import { BillingPage } from "@/pages/billing";
import { SettingsPage } from "@/pages/settings";
import { AdminDashboardPage } from "@/pages/admin-dashboard";
import { UserManagementPage } from "@/pages/user-management";
import { LegalPage } from "@/pages/legal";
import { NotFoundPage } from "@/pages/not-found";
import { ErrorPage } from "@/pages/error-page";
import { HelpPage } from "@/pages/help";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/cookies" element={<LegalPage />} />
          <Route path="/legal/:type" element={<LegalPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/500" element={<ErrorPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="projects" element={<ProjectsListPage />} />
            <Route path="projects/:projectId" element={<ProjectBoardPage />} />
            <Route path="decisions" element={<DecisionLogPage />} />
            <Route path="decisions/new" element={<CreateDecisionPage />} />
            <Route path="decisions/:decisionId" element={<DecisionDetailPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="meetings" element={<MeetingsPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserManagementPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export default App;
