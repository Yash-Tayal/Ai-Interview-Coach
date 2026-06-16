import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getInterviewSession } from '../services/interviewService.js';
import { evaluateInterviewSession } from '../services/aiService.js';
import InterviewReview from '../components/interview/InterviewReview.jsx';
import EvaluationLoader from '../components/interview/EvaluationLoader.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';

function InterviewDetailsPage() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationProgress, setEvaluationProgress] = useState(0);
  const [evaluationStage, setEvaluationStage] = useState(0);
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

  const handleEvaluate = async () => {
    setError('');
    setEvaluating(true);
    setEvaluationProgress(10);
    setEvaluationStage(0);

    const progressInterval = setInterval(() => {
      setEvaluationProgress((prev) => (prev >= 90 ? prev : prev + 2));
      setEvaluationStage((prev) => (prev >= 4 ? prev : prev + 1));
    }, 1500);

    try {
      const result = await evaluateInterviewSession(id);
      setSession(result.data);
      setEvaluationProgress(100);
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(progressInterval);
      setEvaluating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading interview details..." />;
  }

  if (evaluating) {
    return <EvaluationLoader progress={evaluationProgress} stage={evaluationStage} />;
  }

  if (error && !session) {
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
      <InterviewReview
        session={session}
        title="Interview Details"
        showFeedback={session.aiEvaluationCompleted}
      />

      <ErrorMessage message={error} />

      {!session.aiEvaluationCompleted && (
        <div className="results-actions">
          <button type="button" className="link-button" onClick={handleEvaluate}>
            Get AI Feedback
          </button>
        </div>
      )}

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
