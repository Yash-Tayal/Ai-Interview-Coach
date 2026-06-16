import ScoreBadge from './ScoreBadge.jsx';

function AnswerFeedback({ evaluation }) {
  if (!evaluation) {
    return null;
  }

  return (
    <div className="answer-feedback">
      <div className="feedback-header">
        <h3>AI Feedback</h3>
        <ScoreBadge score={evaluation.score} size="sm" />
      </div>

      {evaluation.strengths?.length > 0 && (
        <div className="feedback-block feedback-strengths">
          <h4>Strengths</h4>
          <ul>
            {evaluation.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {evaluation.improvements?.length > 0 && (
        <div className="feedback-block feedback-improvements">
          <h4>Areas for Improvement</h4>
          <ul>
            {evaluation.improvements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {evaluation.suggestedAnswer && (
        <div className="feedback-block feedback-suggested">
          <h4>Suggested Answer</h4>
          <p>{evaluation.suggestedAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default AnswerFeedback;
