import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getInterviewSession } from '../services/interviewService.js';
import InterviewReview from '../components/interview/InterviewReview.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';

function InterviewDetailsPage() {
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
    return <LoadingSpinner message="Loading interview details..." />;
  }

  if (error) {
    return (
      <section className="page">
        <ErrorMessage message={error} />
        <Link to="/interview/history" className="link-button">
          Back to History
        </Link>
      </section>
    );
  }

  return (
    <>
      <InterviewReview session={session} title="Interview Details" />

      <div className="results-actions">
        <Link to="/interview/history" className="link-button link-button-secondary">
          Back to History
        </Link>
        <Link to="/dashboard" className="link-button">
          Go to Dashboard
        </Link>
      </div>
    </>
  );
}

export default InterviewDetailsPage;
