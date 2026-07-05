import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { uploadResume } from '../services/resumeService.js';
import FileUploadZone from '../components/resume/FileUploadZone.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

function ResumeAnalyzerPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return false;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be 5MB or less.');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileSelect = (selectedFile) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a PDF resume to analyze.');
      return;
    }

    setAnalyzing(true);
    setUploadProgress(0);
    setError('');

    try {
      const result = await uploadResume(file, setUploadProgress);
      navigate(`/resume-analyzer/${result.data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  if (analyzing) {
    return (
      <section className="page">
        <div className="analysis-loading">
          <LoadingSpinner message="Analyzing your resume..." />
          <div className="upload-progress-panel">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
            </div>
            <p className="progress-label">
              {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Extracting text and running ATS analysis...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Resume Analyzer</h1>
          <p>Upload your resume for an ATS-style analysis with actionable improvement suggestions.</p>
        </div>
        <Link to="/resume-analyzer/history" className="link-button link-button-secondary">
          View History
        </Link>
      </div>

      <ErrorMessage message={error} />

      <div className="analyzer-card">
        <FileUploadZone file={file} onFileSelect={handleFileSelect} disabled={analyzing} />

        <div className="analyzer-actions">
          <button type="button" className="btn-primary" onClick={handleAnalyze} disabled={!file || analyzing}>
            Analyze Resume
          </button>
        </div>

        <div className="analyzer-tips">
          <h3>Tips for a better ATS score</h3>
          <ul>
            <li>Use standard section headings: Experience, Education, Skills, Projects</li>
            <li>Include contact information with email and LinkedIn/GitHub links</li>
            <li>List relevant technical skills and tools explicitly</li>
            <li>Quantify achievements with measurable results</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ResumeAnalyzerPage;
