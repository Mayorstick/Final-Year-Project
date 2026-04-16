import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";

import AppLayout from "./layouts/AppLayout";
import Personas from "./pages/Personas";
import Missions from "./pages/Missions";
import MissionIssue from "./pages/MissionIssue";
import IssueExplanation from "./pages/IssueExplanation";
import QuickCheck from "./pages/QuickCheck";
import MissionCompleted from "./pages/MissionCompleted";
import Leaderboard from "./pages/Leaderboard";
import ExplainFeedback from "./pages/ExplainFeedback";
import MyAIIssues from "./pages/MyAIIssues";
import AIIssueDetail from "./pages/AIIssueDetail";
import Resources from "./pages/Resources";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Protected Area (navbar + pages) */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/mission/:missionId/quick-check"
          element={
            <ProtectedRoute>
              <QuickCheck />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Later we add: mission, personas, resources */}
        <Route path="/personas" element={<ProtectedRoute><Personas /></ProtectedRoute>} />
        {/* <Route path="/mission" element={<Mission />} /> */}
        <Route path="/mission" element={<ProtectedRoute><Missions /></ProtectedRoute>} />
        {/* <Route path="/personas" element={<Personas />} /> */}
        <Route path="/personas" element={<ProtectedRoute><Personas /></ProtectedRoute>} />
        <Route path="/resources" element={<Resources />} />

        <Route path="/mission" element={<ProtectedRoute><Missions /></ProtectedRoute>} />
        <Route path="/mission/:missionId/completed" element={<MissionCompleted />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/explain-feedback" element={<ExplainFeedback />} />
        <Route path="/my-ai-issues" element={<MyAIIssues />} />
        <Route path="/ai-issues/:issueId" element={<AIIssueDetail />} />


        <Route
          path="/mission/:missionId/issue/:issueIndex"
          element={
            <ProtectedRoute>
              <MissionIssue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mission/:missionId/issue/:issueIndex/learn"
          element={<IssueExplanation />}
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}