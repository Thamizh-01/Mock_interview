import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Simulator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState(['behavioral', 'coding']);
  const [numQuestions, setNumQuestions] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCategories();
  }, [user, navigate]);

  useEffect(() => {
    let interval;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const loadCategories = async () => {
    try {
      const res = await api.get('/questions');
      setCategories(res.data.categories.map(c => c.name));
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCats(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const startSimulator = async () => {
    if (selectedCats.length === 0) {
      alert('Please select at least one category');
      return;
    }

    const allQuestions = [];
    for (const cat of selectedCats) {
      try {
        const res = await api.get(`/questions/${cat}/random?count=${Math.ceil(numQuestions / selectedCats.length)}`);
        allQuestions.push(...res.data.questions.map(q => ({ ...q, category: cat })));
      } catch (err) {
        console.error(`Failed to load ${cat}:`, err);
      }
    }

    const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
    setCurrentQuestion(shuffled[0]);
    setCurrentIndex(0);
    setAllQuestions(shuffled);
    setIsActive(true);
    setTimer(0);
    setIsPaused(false);
  };

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleAnswerModal = () => {
    setShowAnswerModal(prev => !prev);
  };

  const nextQuestion = async () => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(allQuestions[currentIndex + 1]);
    } else {
      await completeInterview();
    }
  };

  const completeInterview = async () => {
    try {
      await api.post('/progress/complete-interview', { timeSpent: timer });
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
    
    setIsActive(false);
    setShowCompleteModal(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDisplayName = (name) => {
    const names = {
      webdev: 'Web Development', datascience: 'Data Science', devops: 'DevOps',
      mobile: 'Mobile', database: 'Database', systemdesign: 'System Design',
      coding: 'Coding', behavioral: 'Behavioral', leadership: 'Leadership', situational: 'Situational'
    };
    return names[name] || name;
  };

  if (!isActive) {
    return (
      <div className="simulator-page section">
        <div className="container">
          <h2 className="text-center mb-2">Mock Interview Simulator</h2>
          <p className="text-center text-muted mb-4">Practice with timed random questions</p>
          
          <div className="simulator-setup card">
            <div className="form-group">
              <label>Select Categories</label>
              <div className="checkbox-group">
                {categories.map(cat => (
                  <label key={cat}>
                    <input
                      type="checkbox"
                      checked={selectedCats.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    {getDisplayName(cat)}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Number of Questions</label>
              <input
                type="number"
                className="form-input"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                min={1}
                max={20}
              />
            </div>
            
            <button className="btn-primary" onClick={startSimulator}>
              Start Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="simulator-active section">
      <div className="container">
        <div className="simulator-card card">
          <div className="timer-display">
            <span className="timer-label">Time Elapsed</span>
            <span className="timer-value">{formatTime(timer)}</span>
            <button className="btn-timer" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
          
          <div className="sim-question">
            <div className="question-category">{getDisplayName(currentQuestion?.category)}</div>
            <p className="question-text">{currentQuestion?.q}</p>
            <div className="sim-actions">
              <button className="btn-secondary" onClick={toggleAnswerModal}>Reveal Answer</button>
              <button className="btn-primary" onClick={nextQuestion}>
                {currentIndex === allQuestions.length - 1 ? 'Complete' : 'Next Question'}
              </button>
            </div>
            <div className="question-progress">
              Question {currentIndex + 1} of {allQuestions.length}
            </div>
          </div>
        </div>
      </div>

      {showAnswerModal && (
        <div className="modal-overlay" onClick={toggleAnswerModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Answer</h3>
              <button className="modal-close" onClick={toggleAnswerModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="answer-box">{currentQuestion?.a}</div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={toggleAnswerModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showCompleteModal && (
        <div className="modal-overlay" onClick={() => setShowCompleteModal(false)}>
          <div className="modal-content modal-small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Interview Complete!</h3>
            </div>
            <div className="modal-body">
              <div className="completion-time">
                <span className="time-label">Time Spent</span>
                <span className="time-value">{formatTime(timer)}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setShowCompleteModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulator;