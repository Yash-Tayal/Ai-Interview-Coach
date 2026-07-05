import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InterviewSetupPage from './pages/InterviewSetupPage.jsx';
import InterviewPage from './pages/InterviewPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import InterviewHistoryPage from './pages/InterviewHistoryPage.jsx';
import InterviewDetailsPage from './pages/InterviewDetailsPage.jsx';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage.jsx';
import ResumeReportPage from './pages/ResumeReportPage.jsx';
import ResumeHistoryPage from './pages/ResumeHistoryPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/setup"
              element={
                <ProtectedRoute>
                  <InterviewSetupPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <InterviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/results/:id"
              element={
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/history"
              element={
                <ProtectedRoute>
                  <InterviewHistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/history/:id"
              element={
                <ProtectedRoute>
                  <InterviewDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-analyzer"
              element={
                <ProtectedRoute>
                  <ResumeAnalyzerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-analyzer/history"
              element={
                <ProtectedRoute>
                  <ResumeHistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-analyzer/:id"
              element={
                <ProtectedRoute>
                  <ResumeReportPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
