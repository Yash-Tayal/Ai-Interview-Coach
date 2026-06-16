import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getInterviewSession } from '../services/interviewService.js';
import { evaluateInterviewSession } from '../services/aiService.js';
import InterviewReview from '../components/interview/InterviewReview.jsx';
import EvaluationLoader from '../components/interview/EvaluationLoader.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';

function ResultsPage() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationProgress, setEvaluationProgress] = useState(0);
  const [evaluationStage, setEvaluationStage] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAndEvaluate = async () => {
      try {
        const result = await getInterviewSession(id);
        const sessionData = result.data;
        setSession(sessionData);

        if (!sessionData.aiEvaluationCompleted) {
          setEvaluating(true);
          setLoading(false);

          const progressInterval = setInterval(() => {
            setEvaluationProgress((prev) => (prev >= 90 ? prev : prev + 2));
            setEvaluationStage((prev) => (prev >= 4 ? prev : prev + 1));
          }, 1500);

          try {
            const evaluationResult = await evaluateInterviewSession(id);
            setSession(evaluationResult.data);
            setEvaluationProgress(100);
          } finally {
            clearInterval(progressInterval);
            setEvaluating(false);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAndEvaluate();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading results..." />;
  }

  if (evaluating) {
    return <EvaluationLoader progress={evaluationProgress} stage={evaluationStage} />;
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
      <InterviewReview session={session} title="Interview Results" showFeedback />

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
