import { normalizeInterviewItems, formatDate } from '../../utils/interview.js';
import ScoreBadge from './ScoreBadge.jsx';
import OverallPerformance from './OverallPerformance.jsx';
import AnswerFeedback from './AnswerFeedback.jsx';

function InterviewReview({ session, title = 'Interview Review', showFeedback = false }) {
  const items = normalizeInterviewItems(session);
  const overallScore = session.overallScore ?? session.score ?? 0;

  return (
    <section className="page interview-report">
      <div className="interview-meta report-header">
        <div>
          <p className="report-eyebrow">Interview Report</p>
          <h1>{title}</h1>
          <p>
            {session.category} · {session.difficulty} · {formatDate(session.createdAt)}
          </p>
        </div>

        {showFeedback && session.aiEvaluationCompleted && (
          <ScoreBadge score={overallScore} size="lg" />
        )}
      </div>

      {showFeedback && session.aiEvaluationCompleted && <OverallPerformance session={session} />}

      <div className="results-list">
        {items.map((item, index) => (
          <article key={`${item.questionText}-${index}`} className="result-card report-card">
            <div className="result-card-header">
              <h2>Question {index + 1}</h2>
              {showFeedback && item.evaluation && (
                <ScoreBadge score={item.evaluation.score} size="sm" />
              )}
            </div>

            <p className="question-text">{item.questionText}</p>

            <h3>Your Answer</h3>
            <p className="answer-text">
              {item.answer.trim() ? item.answer : 'No answer provided'}
            </p>

            {showFeedback && <AnswerFeedback evaluation={item.evaluation} />}
          </article>
        ))}
      </div>
    </section>
  );
}

export default InterviewReview;
