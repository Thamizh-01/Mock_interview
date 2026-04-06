import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Progress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadProgress();
  }, [user, navigate]);

  const loadProgress = async () => {
    try {
      const res = await api.get('/progress');
      setProgress(res.data.progress);
    } catch (err) {
      console.error('Failed to load progress:', err);
      setProgress({
        questionsReviewed: 0,
        categoriesPracticed: [],
        mockInterviewsCompleted: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to reset all progress?')) {
      try {
        await api.post('/progress/reset');
        setProgress({
          questionsReviewed: 0,
          categoriesPracticed: [],
          mockInterviewsCompleted: 0
        });
      } catch (err) {
        console.error('Failed to reset progress:', err);
      }
    }
  };

  const getDisplayName = (name) => {
    const names = {
      webdev: 'Web Development', datascience: 'Data Science', devops: 'DevOps',
      mobile: 'Mobile', database: 'Database', systemdesign: 'System Design',
      coding: 'Coding', behavioral: 'Behavioral', leadership: 'Leadership', situational: 'Situational'
    };
    return names[name] || name;
  };

  if (loading) {
    return (
      <div className="progress-page section">
        <div className="container text-center">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-page section">
      <div className="container">
        <h2 className="text-center mb-4">Your Progress</h2>
        
        <div className="progress-stats">
          <div className="stat-card card">
            <h3>{progress?.questionsReviewed || 0}</h3>
            <p>Questions Reviewed</p>
          </div>
          <div className="stat-card card">
            <h3>{progress?.categoriesPracticed?.length || 0}</h3>
            <p>Categories Practiced</p>
          </div>
          <div className="stat-card card">
            <h3>{progress?.mockInterviewsCompleted || 0}</h3>
            <p>Mock Interviews Completed</p>
          </div>
        </div>

        {progress?.categoriesPracticed?.length > 0 && (
          <div className="categories-practiced mt-4">
            <h3 className="text-center mb-3">Domains Practiced</h3>
            <div className="practiced-tags">
              {progress.categoriesPracticed.map((cat, i) => (
                <span key={i} className="practice-tag">{getDisplayName(cat)}</span>
              ))}
            </div>
          </div>
        )}

        <div className="progress-actions mt-4 text-center">
          <button className="btn-secondary" onClick={handleReset}>Reset Progress</button>
        </div>
      </div>
    </div>
  );
};

export default Progress;