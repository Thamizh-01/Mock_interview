import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Resume = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadPreviousAnalysis();
  }, [user, navigate]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const loadPreviousAnalysis = async () => {
    try {
      const res = await api.get('/resume/analysis');
      setAnalysis(res.data.analysis);
    } catch (err) {
      // No previous analysis
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['.pdf', '.doc', '.docx'];
      const ext = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
      if (validTypes.includes(ext) && selectedFile.size <= 5 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        showMessage('error', 'Please upload a PDF, DOC, or DOCX file under 5MB');
      }
    }
  };

  const analyzeResume = async () => {
    if (!file) {
      showMessage('error', 'Please select a resume file first');
      return;
    }
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('analyze', 'true'); // Tell server to analyze immediately
      
      console.log('Uploading file:', file.name, file.size, file.type);
      
      const res = await api.post('/resume/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Upload & Analyze response:', res.data);
      
      if (res.data.analysis) {
        setAnalysis(res.data.analysis);
        showMessage('success', 'Resume analyzed successfully!');
      } else {
        showMessage('success', 'Resume uploaded! Click Analyze to proceed.');
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      console.error('Error details:', err.response?.data);
      showMessage('error', err.response?.data?.message || 'Failed to analyze resume');
    } finally {
      setAnalyzing(false);
    }
  };

const downloadReport = async () => {
    if (!analysis) return;
    try {
      const response = await api.get('/resume/report/pdf', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Resume_Analysis_Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      showMessage('error', 'Failed to download report');
    }
  };

  return (
    <div className="resume-page section">
      <div className="container">
        {message && (
          <div className={`message-box message-${message.type}`}>
            <span className="message-icon">
              {message.type === 'success' ? '✓' : '✕'}
            </span>
            <span className="message-text">{message.text}</span>
            <button className="message-close" onClick={() => setMessage(null)}>×</button>
          </div>
        )}
        
        <h2 className="text-center mb-2">AI Resume Analysis</h2>
        <p className="text-center text-muted mb-4">Upload your resume for instant feedback</p>

        <div className="resume-upload card">
          {!analysis && (
            <div className="upload-area" onClick={() => document.getElementById('resume-input').click()}>
              <div className="upload-icon">📄</div>
              <p>Drag & drop your resume or <span className="browse-link">browse</span></p>
              <p className="file-types">Supported: PDF, DOC, DOCX (Max 5MB)</p>
              <input 
                type="file" 
                id="resume-input" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
              />
            </div>
          )}
          
          {file && !analysis && (
            <div className="file-info">
              <span>{file.name}</span>
              <button className="btn-remove" onClick={() => setFile(null)}>Remove</button>
            </div>
          )}
          
          {!analysis && (
            <button 
              className="btn-primary" 
              onClick={analyzeResume}
              disabled={!file || analyzing}
            >
              {analyzing ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          )}
        </div>

        {analysis && (
          <div className="analysis-result card mt-4">
            <button 
              className="btn-back" 
              onClick={() => { setAnalysis(null); setFile(null); }}
            >
              ← Upload New Resume
            </button>
            <div className="result-header">
              <h3>Analysis Complete</h3>
              <div className="score-circle">
                <span>{analysis.score}</span>
              </div>
            </div>
            
            <div className="result-section">
              <h4>Strengths</h4>
              <ul>{analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            
            <div className="result-section">
              <h4>Areas for Improvement</h4>
              <ul>{analysis.improvements.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
            </div>

            <div className="result-section">
              <h4>ATS Compatibility</h4>
              <div className="ats-score">
                <div className="ats-bar"><div className="ats-fill" style={{ width: `${analysis.atsScore}%` }}></div></div>
                <span>{analysis.atsScore}%</span>
              </div>
              <ul>{analysis.atsTips.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>

            <div className="result-section">
              <h4>Keyword Analysis</h4>
              <div className="keywords-container">
                <div className="keyword-group">
                  <h5>Found</h5>
                  <div className="keyword-list">
                    {analysis.foundKeywords.map((k, i) => <span key={i} className="keyword-tag found">{k}</span>)}
                  </div>
                </div>
                <div className="keyword-group">
                  <h5>Missing</h5>
                  <div className="keyword-list">
                    {analysis.missingKeywords.map((k, i) => <span key={i} className="keyword-tag missing">{k}</span>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="result-section">
              <h4>Summary</h4>
              <p>{analysis.summary}</p>
            </div>

            <button className="btn-secondary" onClick={downloadReport}>Download Report</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;