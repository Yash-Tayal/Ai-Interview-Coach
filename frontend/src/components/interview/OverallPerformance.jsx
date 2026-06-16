import ScoreBadge from './ScoreBadge.jsx';

function RatingBar({ label, value }) {
  return (
    <div className="rating-bar">
      <div className="rating-bar-header">
        <span>{label}</span>
        <strong>{value}/100</strong>
      </div>
      <div className="rating-track">
        <div className="rating-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function OverallPerformance({ session }) {
  const overallScore = session.overallScore ?? session.score ?? 0;
  const feedback = session.overallFeedback || {};

  return (
    <section className="report-panel overall-performance">
      <div className="overall-header">
        <div>
          <h2>Overall Performance</h2>
          <p>AI-generated interview performance summary</p>
        </div>
        <ScoreBadge score={overallScore} size="lg" />
      </div>

      {feedback.summary && <p className="overall-summary">{feedback.summary}</p>}

      <div className="ratings-grid">
        <RatingBar label="Communication" value={feedback.communicationRating || 0} />
        <RatingBar label="Technical" value={feedback.technicalRating || 0} />
        <RatingBar label="Confidence" value={feedback.confidenceRating || 0} />
      </div>

      {feedback.finalFeedback && (
        <div className="final-feedback">
          <h3>Final Feedback</h3>
          <p>{feedback.finalFeedback}</p>
        </div>
      )}
    </section>
  );
}

export default OverallPerformance;
