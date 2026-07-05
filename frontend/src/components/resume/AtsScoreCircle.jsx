import { getAtsScoreClass, getAtsScoreColor, getAtsScoreTrackColor } from '../../utils/resume.js';

function AtsScoreCircle({ score, size = 140 }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getAtsScoreTrackColor(score);

  return (
    <div className={`ats-score-circle ${getAtsScoreClass(score)}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="ats-circle-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="ats-circle-progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ats-circle-label">
        <span className="ats-circle-value" style={{ color: getAtsScoreColor(score) }}>
          {score}
        </span>
        <span className="ats-circle-unit">/ 100</span>
      </div>
    </div>
  );
}

export default AtsScoreCircle;
