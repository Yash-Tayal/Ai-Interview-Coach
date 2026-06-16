import { getScoreClass } from '../../utils/interview.js';

function ScoreBadge({ score, size = 'md' }) {
  return (
    <div className={`score-badge ${getScoreClass(score)} score-badge-${size}`}>
      <span className="score-value">{score}</span>
      <span className="score-unit">/ 100</span>
    </div>
  );
}

export default ScoreBadge;
