import { normalizeInterviewItems, formatDate } from '../../utils/interview.js';

function InterviewReview({ session, title = 'Interview Review' }) {
  const items = normalizeInterviewItems(session);

  return (
    <section className="page">
      <div className="interview-meta">
        <h1>{title}</h1>
        <p>
          {session.category} · {session.difficulty} · {formatDate(session.createdAt)}
        </p>
        {session.score !== undefined && (
          <p className="meta-badge">Score: {session.score} (AI evaluation coming soon)</p>
        )}
      </div>

      <div className="results-list">
        {items.map((item, index) => (
          <article key={`${item.questionText}-${index}`} className="result-card">
            <h2>Question {index + 1}</h2>
            <p className="question-text">{item.questionText}</p>

            <h3>Your Answer</h3>
            <p className="answer-text">
              {item.answer.trim() ? item.answer : 'No answer provided'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default InterviewReview;
