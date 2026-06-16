import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getInterviewSession } from '../services/interviewService.js';
import InterviewReview from '../components/interview/InterviewReview.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';

function ResultsPage() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSession = async () => {
      try {
        const result = await getInterviewSession(id);
        setSession(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading results..." />;
  }

  if (error) {
    return (
      <section className="page">
        <ErrorMessage message={error} />
        <Link to="/interview/setup" className="link-button">
          Start New Interview
        </Link>
      </section>
    );
  }

  return (
    <>
      <InterviewReview session={session} title="Interview Results" />

      <div className="results-actions">
        <Link to="/interview/setup" className="link-button">
          Start New Interview
        </Link>
        <Link to="/dashboard" className="link-button link-button-secondary">
          Back to Dashboard
        </Link>
      </div>
    </>
  );
}

export default ResultsPage;
