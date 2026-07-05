import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getResumeById } from '../services/resumeService.js';
import AnalysisReport from '../components/resume/AnalysisReport.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';

function ResumeReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReport = async () => {
      try {
        const result = await getResumeById(id);
        setReport(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading analysis report..." />;
  }

  if (error) {
    return (
      <section className="page">
        <ErrorMessage message={error} />
        <Link to="/resume-analyzer" className="link-button">
          Back to Analyzer
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Analysis Report</h1>
          <p>Detailed ATS compatibility breakdown for your resume.</p>
        </div>
        <div className="page-header-actions">
          <Link to="/resume-analyzer/history" className="link-button link-button-secondary">
            History
          </Link>
          <Link to="/resume-analyzer" className="link-button">
            Analyze Another
          </Link>
        </div>
      </div>

      <AnalysisReport report={report} />
    </section>
  );
}

export default ResumeReportPage;
