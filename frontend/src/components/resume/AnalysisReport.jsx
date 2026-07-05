import AtsScoreCircle from './AtsScoreCircle.jsx';
import AtsProgressBar from './AtsProgressBar.jsx';
import AtsScoreCategory from './AtsScoreCategory.jsx';
import { formatDate } from '../../utils/interview.js';

function SkillTags({ skills, variant = 'detected' }) {
  if (!skills?.length) {
    return <p className="report-empty-text">None identified</p>;
  }

  return (
    <div className="skill-tags">
      {skills.map((skill) => (
        <span key={skill} className={`skill-tag skill-tag-${variant}`}>
          {skill}
        </span>
      ))}
    </div>
  );
}

function FeedbackList({ items, variant = 'strength' }) {
  if (!items?.length) {
    return <p className="report-empty-text">No items to display</p>;
  }

  return (
    <ul className={`feedback-list feedback-list-${variant}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function AnalysisReport({ report }) {
  return (
    <div className="analysis-report">
      <div className="report-score-panel">
        <div className="report-score-visual">
          <AtsScoreCircle score={report.atsScore} />
          <div className="report-score-meta">
            <p className="report-eyebrow">ATS Analysis Report</p>
            <h2>{report.originalFileName}</h2>
            <p className="report-date">Analyzed on {formatDate(report.createdAt)}</p>
            <AtsScoreCategory score={report.atsScore} />
          </div>
        </div>
        <AtsProgressBar score={report.atsScore} />
      </div>

      <div className="report-grid">
        <section className="report-section">
          <h3>Detected Skills</h3>
          <p className="report-section-hint">{report.detectedSkills?.length || 0} technical keywords found</p>
          <SkillTags skills={report.detectedSkills} variant="detected" />
        </section>

        <section className="report-section">
          <h3>Missing Skills</h3>
          <p className="report-section-hint">In-demand skills not detected in your resume</p>
          <SkillTags skills={report.missingSkills} variant="missing" />
        </section>

        <section className="report-section report-section-full">
          <h3>Strengths</h3>
          <FeedbackList items={report.strengths} variant="strength" />
        </section>

        <section className="report-section report-section-full">
          <h3>Improvement Suggestions</h3>
          <FeedbackList items={report.improvements} variant="improvement" />
        </section>
      </div>
    </div>
  );
}

export default AnalysisReport;
