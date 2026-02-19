import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/stores";
import { ProtectedRoute } from "@/components/protected-route";
import { AppLayout } from "@/components/layout/app-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { SetsPage } from "@/pages/sets-page";
import { SetDetailPage } from "@/pages/set-detail-page";
import { StudyPage } from "@/pages/study-page";
import { GeneratePage } from "@/pages/generate-page";
import { AchievementsPage } from "@/pages/achievements-page";
import { LeaderboardPage } from "@/pages/leaderboard-page";
import { ConversationsPage } from "@/pages/conversations-page";
import { ChatPage } from "@/pages/chat-page";
import { ConversationDetailPage } from "@/pages/conversation-detail-page";
import { ForgotPasswordPage } from "@/pages/forgot-password-page";
import { ResetPasswordPage } from "@/pages/reset-password-page";
import { StatisticsPage } from "@/pages/statistics-page";
import { FriendsPage } from "@/pages/friends-page";
import { FriendProgressPage } from "@/pages/friend-progress-page";
import { ProfilePage } from "@/pages/profile-page";
import { AdminDashboardPage } from "@/pages/admin-dashboard-page";
import { AdminUsersPage } from "@/pages/admin-users-page";
import { AdminCardSetsPage } from "@/pages/admin-card-sets-page";
import { NotFoundPage } from "@/pages/not-found-page";

function App() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/sets" element={<SetsPage />} />
              <Route path="/sets/:id" element={<SetDetailPage />} />
              <Route path="/study/:id" element={<StudyPage />} />
              <Route path="/generate" element={<GeneratePage />} />
              <Route path="/conversations" element={<ConversationsPage />} />
              <Route path="/conversations/:id/chat" element={<ChatPage />} />
              <Route path="/conversations/:id" element={<ConversationDetailPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/friends/:userId/progress" element={<FriendProgressPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/card-sets" element={<AdminCardSetsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
