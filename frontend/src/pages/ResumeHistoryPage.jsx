import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getResumeHistory } from '../services/resumeService.js';
import { formatDate } from '../utils/interview.js';
import { getAtsScoreClass } from '../utils/resume.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

function ResumeHistoryPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const result = await getResumeHistory();
        setResumes(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading resume history..." />;
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Resume History</h1>
          <p>Review all your previously analyzed resumes and ATS scores.</p>
        </div>
        <Link to="/resume-analyzer" className="link-button">
          Analyze Resume
        </Link>
      </div>

      <ErrorMessage message={error} />

      {resumes.length === 0 && !error ? (
        <EmptyState
          title="No resume analyses yet"
          message="Upload your first resume to get an ATS compatibility report."
          action={
            <Link to="/resume-analyzer" className="link-button">
              Analyze Resume
            </Link>
          }
        />
      ) : (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Upload Date</th>
                <th>File Name</th>
                <th>ATS Score</th>
                <th>Skills Found</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume._id}>
                  <td>{formatDate(resume.createdAt)}</td>
                  <td>{resume.originalFileName}</td>
                  <td>
                    <span className={`score-pill ${getAtsScoreClass(resume.atsScore)}`}>
                      {resume.atsScore}/100
                    </span>
                  </td>
                  <td>{resume.detectedSkillsCount}</td>
                  <td>
                    <Link to={`/resume-analyzer/${resume._id}`} className="table-link">
                      View Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ResumeHistoryPage;
