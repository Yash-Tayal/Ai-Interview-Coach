import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitInterview } from '../services/interviewService.js';

function InterviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions = [], category = '', difficulty = '' } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => ''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!questions.length) {
      navigate('/interview/setup', { replace: true });
    }
  }, [questions, navigate]);

  if (!questions.length) {
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const questionsPayload = questions.map((question) => ({
        questionId: question._id,
        text: question.question,
      }));

      const answersPayload = questions.map((question, index) => ({
        questionId: question._id,
        text: answers[index],
      }));

      const result = await submitInterview({
        category,
        difficulty,
        questions: questionsPayload,
        answers: answersPayload,
      });

      navigate(`/interview/results/${result.data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="interview-header">
        <h1>Interview Practice</h1>
        <p>
          {category} · {difficulty} · Question {currentIndex + 1} of {questions.length}
        </p>
      </div>

      {error && <p className="error-message">{error}</p>}

      <article className="interview-card">
        <h2>Question {currentIndex + 1}</h2>
        <p className="question-text">{currentQuestion.question}</p>

        <label htmlFor="answer">Your Answer</label>
        <textarea
          id="answer"
          className="answer-input"
          rows={8}
          placeholder="Type your answer here..."
          value={answers[currentIndex]}
          onChange={handleAnswerChange}
          disabled={loading}
        />
      </article>

      <div className="interview-actions">
        <button type="button" onClick={handlePrevious} disabled={isFirst || loading}>
          Previous
        </button>

        {!isLast && (
          <button type="button" onClick={handleNext} disabled={loading}>
            Next
          </button>
        )}

        {isLast && (
          <button type="button" className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </section>
  );
}

export default InterviewPage;
