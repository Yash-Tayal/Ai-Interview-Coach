const EVALUATION_STAGES = [
  'Reviewing your answers...',
  'Analyzing technical depth...',
  'Evaluating communication clarity...',
  'Generating personalized feedback...',
  'Preparing your interview report...',
];

function EvaluationLoader({ progress = 0, stage = 0 }) {
  const message = EVALUATION_STAGES[stage] || 'Analyzing your interview...';

  return (
    <div className="evaluation-loader">
      <div className="evaluation-loader-card">
        <div className="evaluation-loader-icon" aria-hidden="true">
          <div className="pulse-ring" />
          <span>AI</span>
        </div>

        <h2>Analyzing your interview...</h2>
        <p className="evaluation-stage">{message}</p>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-label">{progress}% complete</p>
      </div>
    </div>
  );
}

export default EvaluationLoader;
