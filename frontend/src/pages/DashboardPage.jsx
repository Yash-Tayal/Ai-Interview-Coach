import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../services/dashboardService.js';
import { getInterviewSessions } from '../services/interviewService.js';
import { getUser } from '../utils/auth.js';
import { formatDate, formatDateShort } from '../utils/interview.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import StatCard from '../components/common/StatCard.jsx';
import PerformanceTrend from '../components/dashboard/PerformanceTrend.jsx';
import ScoreBadge from '../components/interview/ScoreBadge.jsx';

function DashboardPage() {
  const user = getUser();
  const [stats, setStats] = useState(null);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsResult, interviewsResult] = await Promise.all([
          getDashboardStats(),
          getInterviewSessions(),
        ]);

        setStats(statsResult.data);
        setRecentInterviews(interviewsResult.data.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <section className="page">
        <ErrorMessage message={error} />
      </section>
    );
  }

  const categoriesPracticed = stats.interviewsByCategory.length;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back{user?.name ? `, ${user.name}` : ''}. Track your interview practice progress.</p>
        </div>
        <div className="page-header-actions">
          <Link to="/interview/setup" className="link-button">
            Start Interview
          </Link>
          <Link to="/resume-analyzer" className="link-button link-button-secondary">
            Analyze Resume
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Interviews" value={stats.totalInterviews} />
        <StatCard label="Categories Practiced" value={categoriesPracticed} />
        <StatCard
          label="Average Score"
          value={stats.evaluatedInterviewsCount > 0 ? `${stats.averageInterviewScore}/100` : 'N/A'}
          hint={stats.evaluatedInterviewsCount > 0 ? `${stats.evaluatedInterviewsCount} evaluated` : 'Get AI feedback on interviews'}
        />
        <StatCard
          label="Best Score"
          value={stats.bestScore > 0 ? `${stats.bestScore}/100` : 'N/A'}
          hint="Your highest interview score"
        />
        <StatCard
          label="Resumes Analyzed"
          value={stats.totalResumesAnalyzed ?? 0}
          hint="Total resume ATS analyses"
        />
        <StatCard
          label="Latest ATS Score"
          value={stats.latestAtsScore != null ? `${stats.latestAtsScore}/100` : 'N/A'}
          hint={stats.latestResumeDate ? `Last analyzed ${formatDateShort(stats.latestResumeDate)}` : 'Upload a resume to analyze'}
        />
        <StatCard
          label="Best ATS Score"
          value={stats.bestAtsScore != null ? `${stats.bestAtsScore}/100` : 'N/A'}
          hint="Your highest resume ATS score"
        />
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-panel">
          <h2>Performance Trend</h2>
          <PerformanceTrend trend={stats.performanceTrend} />
        </section>

        <section className="dashboard-panel">
          <h2>Recent Scores</h2>

          {stats.recentScores.length === 0 ? (
            <EmptyState
              title="No scores yet"
              message="Complete an interview and receive AI feedback to track your scores."
            />
          ) : (
            <ul className="score-list">
              {stats.recentScores.map((item) => (
                <li key={item.sessionId} className="score-list-item">
                  <div>
                    <p className="recent-title">
                      {item.category} · {item.difficulty}
                    </p>
                    <p className="recent-date">{formatDate(item.createdAt)}</p>
                  </div>
                  <ScoreBadge score={item.score} size="sm" />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dashboard-panel">
          <h2>Practice Statistics</h2>

          {stats.interviewsByCategory.length === 0 ? (
            <EmptyState
              title="No statistics yet"
              message="Complete an interview to see category and difficulty breakdowns."
            />
          ) : (
            <>
              <div className="stats-section">
                <h3>By Category</h3>
                <ul className="stats-list">
                  {stats.interviewsByCategory.map((item) => (
                    <li key={item.category}>
                      <span>{item.category}</span>
                      <span className="stats-count">{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="stats-section">
                <h3>By Difficulty</h3>
                <ul className="stats-list">
                  {stats.interviewsByDifficulty.map((item) => (
                    <li key={item.difficulty}>
                      <span>{item.difficulty}</span>
                      <span className="stats-count">{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </section>

        <section className="dashboard-panel">
          <div className="panel-header">
            <h2>Recent Interviews</h2>
            <Link to="/interview/history" className="panel-link">
              View All
            </Link>
          </div>

          {recentInterviews.length === 0 ? (
            <EmptyState
              title="No interviews yet"
              message="Your recent practice sessions will appear here."
              action={
                <Link to="/interview/setup" className="link-button">
                  Start Your First Interview
                </Link>
              }
            />
          ) : (
            <ul className="recent-list">
              {recentInterviews.map((interview) => (
                <li key={interview._id} className="recent-item">
                  <div>
                    <p className="recent-title">
                      {interview.category} · {interview.difficulty}
                      {interview.aiEvaluationCompleted && (
                        <span className="inline-score"> · {interview.overallScore ?? interview.score}/100</span>
                      )}
                    </p>
                    <p className="recent-date">{formatDate(interview.createdAt)}</p>
                  </div>
                  <Link to={`/interview/history/${interview._id}`} className="text-link">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  );
}

export default DashboardPage;
