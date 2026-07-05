import { getAtsScoreClass, getAtsScoreTrackColor } from '../../utils/resume.js';

function AtsProgressBar({ score, label = 'ATS Compatibility' }) {
  return (
    <div className="ats-progress">
      <div className="ats-progress-header">
        <span>{label}</span>
        <span className={`ats-progress-value ${getAtsScoreClass(score)}`}>{score}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${score}%`, background: getAtsScoreTrackColor(score) }}
        />
      </div>
    </div>
  );
}

export default AtsProgressBar;
