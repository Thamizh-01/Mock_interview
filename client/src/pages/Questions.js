import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Questions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [attendedCount, setAttendedCount] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [questionResults, setQuestionResults] = useState([]);
  const [showDetailedReport, setShowDetailedReport] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCategories();
  }, [user, navigate]);

  const loadCategories = async () => {
    try {
      const res = await api.get('/questions');
      setCategories(res.data.categories);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadQuestions = async (category) => {
    try {
      const res = await api.get(`/questions/${category}`);
      setQuestions(res.data.questions);
      setSelectedCategory(category);
      setCurrentIndex(0);
      setShowAnswer(false);
      setSubmitted(false);
      setIsFinished(false);
      setScore(0);
      setAttendedCount(0);
      setAnswers({});
      setAnalysisResult(null);
      setQuestionResults([]);
      setShowDetailedReport(false);
    } catch (err) {
      console.error('Failed to load questions:', err);
    }
  };

  const handleMarkReviewed = async () => {
    try {
      const questionId = questions[currentIndex]?.id || questions[currentIndex]?.domain;
      await api.post('/progress/mark-reviewed', {
        questionId: questionId,
        category: selectedCategory
      });
    } catch (err) {
      console.error('Failed to mark reviewed:', err);
    }
  };

  const handleSubmitAnswer = async () => {
    const userAnswer = answers[questions[currentIndex]?.id];
    const correctAnswer = questions[currentIndex]?.a;
    const question = questions[currentIndex]?.q;

    if (!userAnswer?.trim() || !correctAnswer) return;

    setSubmitting(true);
    try {
      const res = await api.post('/questions/analyze', {
        userAnswer,
        correctAnswer,
        question
      });

      const result = res.data;
      
      setQuestionResults(prev => [...prev, {
        question: question,
        userAnswer,
        correctAnswer,
        result
      }]);
      
      setAnalysisResult(result);
      setSubmitted(true);

      // Count as correct if has matched keywords or good score
      const hasCorrect = result.matchedTerms > 0 || result.score >= 50;
      
      if (hasCorrect) {
        setScore(prev => prev + 1);
      }
      setAttendedCount(prev => prev + 1);

      await handleMarkReviewed();

    } catch (err) {
      console.error('Failed to analyze answer:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
      
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          handleNext();
        } else {
          setIsFinished(true);
        }
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setSubmitted(false);
      setAnalysisResult(null);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setSubmitted(false);
      setAnalysisResult(null);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleViewReport = () => {
    setShowDetailedReport(true);
  };

  const handleBackToResults = () => {
    setShowDetailedReport(false);
  };

  const handleRestart = () => {
    if (selectedCategory) {
      loadQuestions(selectedCategory);
    } else {
      setIsFinished(false);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setQuestions([]);
    setIsFinished(false);
    setScore(0);
    setAttendedCount(0);
  };

  const getDisplayName = (name) => {
    const names = {
      webdev: 'Web Development',
      datascience: 'Data Science & ML',
      devops: 'DevOps & Cloud',
      mobile: 'Mobile Development',
      database: 'Database',
      systemdesign: 'System Design',
      coding: 'Coding & Algorithms',
      behavioral: 'Behavioral',
      leadership: 'Leadership',
      situational: 'Situational',
      companydomains: 'Company Domains',
      cognitive: 'Cognitive Abilities',
      emotional: 'Emotional Intelligence',
      social: 'Social Skills',
      physical: 'Physical Health',
      financial: 'Financial Literacy',
      softwareeng: 'Software Engineering',
      datascienceint: 'Data Science (Interview)',
      productmgmt: 'Product Management',
      devopsint: 'DevOps (Interview)'
    };
    return names[name] || name;
  };

  const getScoreColor = () => {
    const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#f43f5e';
  };

  const getScoreMessage = () => {
    const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
    if (percentage >= 80) return 'Excellent! You\'re well prepared!';
    if (percentage >= 60) return 'Good job! Keep practicing!';
    return 'Keep studying! You can do better!';
  };

  const getGradeColor = (grade) => {
    if (grade === 'Excellent') return '#10b981';
    if (grade === 'Good') return '#6366f1';
    if (grade === 'Partial') return '#f59e0b';
    return '#f43f5e';
  };

  if (!selectedCategory) {
    return (
      <div className="questions-page section">
        <div className="container">
          <h2 className="text-center mb-4">Practice Questions</h2>
          <p className="text-center text-muted mb-4">Select a domain to start practicing</p>
          <div className="category-grid">
            {categories.map(cat => (
              <div 
                key={cat.name} 
                className="category-card card"
                onClick={() => loadQuestions(cat.name)}
              >
                <h3>{cat.displayName}</h3>
                <p>{cat.count} questions</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isFinished && !showDetailedReport) {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="results-page section">
        <div className="container">
          <div className="results-card">
            <div className="results-header">
              <h2>Test Complete!</h2>
              <p className="results-subtitle">{getDisplayName(selectedCategory)}</p>
            </div>
            
            <div className="score-display">
              <div className="score-circle-large" style={{ borderColor: getScoreColor() }}>
                <span className="score-percentage" style={{ color: getScoreColor() }}>{percentage}%</span>
              </div>
              <p className="score-message">{getScoreMessage()}</p>
            </div>

            <div className="score-details">
              <div className="score-stat">
                <span className="stat-value" style={{ color: '#10b981' }}>{score}</span>
                <span className="stat-label">Correct</span>
              </div>
              <div className="score-stat">
                <span className="stat-value" style={{ color: '#6366f1' }}>{questions.length}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="score-stat">
                <span className="stat-value" style={{ color: getScoreColor() }}>{attendedCount - score}</span>
                <span className="stat-label">Partial</span>
              </div>
            </div>

            <div className="results-actions">
              <button className="btn-primary" onClick={handleViewReport}>
                View Detailed Report
              </button>
              <button className="btn-secondary" onClick={handleRestart}>
                Try Again
              </button>
              <button className="btn-secondary" onClick={handleBackToCategories}>
                Choose Another Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished && showDetailedReport) {
    return (
      <div className="detailed-report section">
        <div className="container">
          <div className="report-header">
            <button className="btn-back" onClick={handleBackToResults}>
              ← Back to Results
            </button>
            <h2>Detailed Report</h2>
            <p>{getDisplayName(selectedCategory)}</p>
          </div>
          
          <div className="report-summary">
            <div className="summary-stat">
              <span className="stat-value">{score}/{questions.length}</span>
              <span className="stat-label">Score</span>
            </div>
            <div className="summary-stat">
              <span className="stat-value">{attendedCount}</span>
              <span className="stat-label">Attended</span>
            </div>
            <div className="summary-stat">
              <span className="stat-value">{questions.length - attendedCount}</span>
              <span className="stat-label">Skipped</span>
            </div>
          </div>

          <div className="question-reviews">
            {questionResults.map((qr, index) => (
              <div key={index} className="review-card">
                <div className="review-question">
                  <span className="review-number">Q{index + 1}</span>
                  <p>{qr.question}</p>
                </div>
                <div className="review-answer">
                  <div className="your-answer">
                    <h4>Your Answer:</h4>
                    <p>{qr.userAnswer}</p>
                  </div>
                  <div className="correct-answer">
                    <h4>Correct Answer:</h4>
                    <p>{qr.correctAnswer}</p>
                  </div>
                </div>
                {qr.result && (
                  <div className="review-feedback">
                    <div className="feedback-header" style={{ background: `linear-gradient(135deg, ${getGradeColor(qr.result.grade)} 0%, ${getGradeColor(qr.result.grade)}dd 100%)` }}>
                      <span className="feedback-grade">{qr.result.grade}</span>
                      <span className="feedback-score">{qr.result.score}%</span>
                    </div>
                    <div className="feedback-body">
                      <p className="feedback-text">{qr.result.feedback}</p>
                      {qr.result.missingPoints?.length > 0 && (
                        <div className="missing-points">
                          <p className="missing-title">Key points to add:</p>
                          <ul>
                            {qr.result.missingPoints.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="report-actions">
            <button className="btn-primary" onClick={handleRestart}>
              Try Again
            </button>
            <button className="btn-secondary" onClick={handleBackToCategories}>
              Choose Another Topic
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="question-area section">
      <div className="container">
        <div className="question-header">
          <button 
            className="btn-secondary" 
            onClick={handleBackToCategories}
          >
            ← Back
          </button>
          <h2 id="category-title">{getDisplayName(selectedCategory)}</h2>
          <div className="question-stats">
            <span id="question-counter">Question {currentIndex + 1} of {questions.length}</span>
            <span className="attended-counter">Attended: {attendedCount}</span>
            <span className="score-counter">Score: {score}</span>
          </div>
        </div>
        
        <div className="question-content" style={{ animation: 'fadeInUp 0.4s ease' }}>
          {selectedCategory === 'companydomains' ? (
            <div className="domain-info">
              <div className="domain-card">
                <h3>Company: {questions[currentIndex]?.company}</h3>
                <p><strong>Domain:</strong> {questions[currentIndex]?.domain}</p>
                <p><strong>Industry:</strong> {questions[currentIndex]?.industry}</p>
              </div>
            </div>
          ) : questions[currentIndex]?.a ? (
            <div className="interview-section">
              <div className="interview-question-box">
                <span className="question-badge">Question</span>
                <p className="question-prompt">{questions[currentIndex]?.q}</p>
              </div>
              
              <div className="answer-input-wrapper">
                <label className="answer-label">
                  <span className="label-dot"></span>
                  Your Answer
                </label>
                <textarea
                  className="user-answer-input"
                  placeholder="Write your answer here..."
                  value={answers[questions[currentIndex]?.id] || ''}
                  onChange={(e) => {
                    setAnswers({
                      ...answers,
                      [questions[currentIndex]?.id]: e.target.value
                    });
                    setSubmitted(false);
                    setAnalysisResult(null);
                  }}
                  rows={6}
                  disabled={submitted}
                />
              </div>
              
              <div className="answer-actions">
                <button 
                  className={`btn-submit-answer ${submitted ? 'submitted' : ''}`}
                  onClick={handleSubmitAnswer}
                  disabled={submitting || !answers[questions[currentIndex]?.id]?.trim() || submitted}
                >
                  {submitting ? 'Submitting...' : submitted ? 'Submitted ✓' : 'Submit Answer'}
                </button>
                
                <button 
                  className="answer-toggle-btn" 
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </button>
              </div>

              {/* Analysis now shown after test completion - stored in questionResults */}
              
              {showAnswer && !analysisResult && (
                <div className="correct-answer-box">
                  <div className="correct-answer-header">
                    <span className="header-icon">✓</span>
                    <h4>Correct Answer</h4>
                  </div>
                  <div className="correct-answer-content">
                    <p>{questions[currentIndex]?.a}</p>
                  </div>
                </div>
              )}
            </div>
          ) : ['cognitive', 'emotional', 'social', 'physical', 'financial'].includes(selectedCategory) ? (
            <div className="user-answer-section">
              <div className="question-prompt-box">
                <span className="question-badge">Question</span>
                <p className="question-prompt">{questions[currentIndex]?.q}</p>
              </div>
              <div className="answer-input-wrapper">
                <textarea
                  className="user-answer-input"
                  placeholder="Write your answer here..."
                  value={answers[questions[currentIndex]?.id] || ''}
                  onChange={(e) => {
                    setAnswers({
                      ...answers,
                      [questions[currentIndex]?.id]: e.target.value
                    });
                    setSubmitted(false);
                  }}
                  rows={5}
                />
              </div>
              <button 
                className={`btn-submit-answer ${submitted ? 'submitted' : ''}`}
                onClick={handleSubmitAnswer}
                disabled={submitting || !answers[questions[currentIndex]?.id]?.trim()}
              >
                {submitting ? 'Analyzing...' : submitted ? 'Analyzed ✓' : 'Submit Answer'}
              </button>
            </div>
          ) : (
            <div className="simple-question">
              <p className="question-text">{questions[currentIndex]?.q}</p>
              <button 
                className="answer-toggle-btn" 
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>
              
              {showAnswer && (
                <div className="answer-box">
                  <h4>Suggested Answer:</h4>
                  <p>{questions[currentIndex]?.a}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="question-nav">
          <button 
            className="btn-nav" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>
          <button 
            className="btn-finish" 
            onClick={handleFinish}
          >
            🏁 Finish Test
          </button>
          <button 
            className="btn-nav btn-next" 
            onClick={handleNext}
          >
            {currentIndex === questions.length - 1 ? 'Finish →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;