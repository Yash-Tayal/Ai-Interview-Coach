import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInterviewSessions } from '../services/interviewService.js';
import { formatDate } from '../utils/interview.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

function InterviewHistoryPage() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const result = await getInterviewSessions();
        setInterviews(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading interview history..." />;
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Interview History</h1>
          <p>Review all your past practice sessions.</p>
        </div>
        <Link to="/interview/setup" className="link-button">
          New Interview
        </Link>
      </div>

      <ErrorMessage message={error} />

      {interviews.length === 0 && !error ? (
        <EmptyState
          title="No interview history"
          message="You haven't completed any interviews yet. Start practicing to build your history."
          action={
            <Link to="/interview/setup" className="link-button">
              Start Interview
            </Link>
          }
        />
      ) : (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Score</th>
                <th>Questions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => (
                <tr key={interview._id}>
                  <td>{formatDate(interview.createdAt)}</td>
                  <td>{interview.category}</td>
                  <td>
                    <span className={`badge badge-${interview.difficulty.toLowerCase()}`}>
                      {interview.difficulty}
                    </span>
                  </td>
                  <td>
                    {interview.aiEvaluationCompleted ? (
                      <span className="score-pill">{interview.overallScore ?? interview.score}/100</span>
                    ) : (
                      <span className="score-pill pending">Pending</span>
                    )}
                  </td>
                  <td>{interview.questionCount}</td>
                  <td>
                    <Link to={`/interview/history/${interview._id}`} className="table-link">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default InterviewHistoryPage;
