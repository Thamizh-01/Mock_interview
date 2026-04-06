import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadAnalytics();
  }, [user, navigate]);

  useEffect(() => {
    if (activeTab === 'overview') {
      loadAnalytics();
    }
  }, [activeTab]);

  const loadAnalytics = async () => {
    try {
      const res = await api.get('/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
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

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="dashboard-page section">
        <div className="container text-center">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page section">
      <div className="container">
        <div className="dashboard-header">
          <div className="user-welcome">
            <h1>Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p>Here's your interview preparation progress</p>
          </div>
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="stat-number">{analytics?.overview?.questionsReviewed || 0}</span>
              <span className="stat-label">Total Questions</span>
            </div>
            <div className="quick-stat">
              <span className="stat-number">{analytics?.overview?.mockInterviewsCompleted || 0}</span>
              <span className="stat-label">Interviews</span>
            </div>
            <div className="quick-stat">
              <span className="stat-number">{formatTime(analytics?.overview?.totalTimeSpent || 0)}</span>
              <span className="stat-label">Time Spent</span>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <div className="stat-card-large card">
                <h3>Questions Reviewed</h3>
                <div className="big-stat">{analytics?.overview?.questionsReviewed || 0}</div>
                <p className="stat-trend">
                  {analytics?.monthly?.improvement > 0 ? `↑ ${analytics?.monthly?.improvement}%` : 'Keep it up!'} this month
                </p>
              </div>
              <div className="stat-card-large card">
                <h3>Mock Interviews</h3>
                <div className="big-stat">{analytics?.overview?.mockInterviewsCompleted || 0}</div>
                <p className="stat-trend">Total completed</p>
              </div>
              <div className="stat-card-large card">
                <h3>Categories Practiced</h3>
                <div className="big-stat">{analytics?.overview?.categoriesPracticed?.length || 0}</div>
                <p className="stat-trend">Domains explored</p>
              </div>
              <div className="stat-card-large card">
                <h3>Time Invested</h3>
                <div className="big-stat">{formatTime(analytics?.overview?.totalTimeSpent || 0)}</div>
                <p className="stat-trend">Total practice time</p>
              </div>

              {analytics?.recentActivities?.length > 0 && (
                <div className="recent-activity card">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    {analytics.recentActivities.slice(0, 5).map((activity, i) => (
                      <div key={i} className="activity-item">
                        <span className="activity-icon">
                          {activity.type === 'question_reviewed' ? '📝' : 
                           activity.type === 'interview_completed' ? '🎯' : '📄'}
                        </span>
                        <div className="activity-details">
                          <span className="activity-type">
                            {activity.type === 'question_reviewed' ? 'Question reviewed' : 
                             activity.type === 'interview_completed' ? 'Interview completed' : 'Resume analyzed'}
                          </span>
                          <span className="activity-date">
                            {new Date(activity.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analytics?.overview?.categoriesPracticed?.length > 0 && (
                <div className="categories-practiced card">
                  <h3>Domains Practiced</h3>
                  <div className="domain-tags">
                    {analytics.overview.categoriesPracticed.map((cat, i) => (
                      <span key={i} className="domain-tag">{getDisplayName(cat)}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'weekly' && analytics?.weekly && (
            <div className="weekly-section">
              <div className="period-header">
                <h3>This Week</h3>
                <span className="period-date">
                  {new Date(analytics.weekly.startDate).toLocaleDateString()}
                </span>
              </div>

              <div className="weekly-stats">
                <div className="weekly-stat card">
                  <span className="weekly-stat-value">{analytics.weekly.questionsReviewed}</span>
                  <span className="weekly-stat-label">Questions Reviewed</span>
                </div>
                <div className="weekly-stat card">
                  <span className="weekly-stat-value">{analytics.weekly.interviewsCompleted}</span>
                  <span className="weekly-stat-label">Interviews Completed</span>
                </div>
                <div className="weekly-stat card">
                  <span className="weekly-stat-value">{formatTime(analytics.weekly.totalTimeSpent)}</span>
                  <span className="weekly-stat-label">Time Spent</span>
                </div>
              </div>

              <div className="daily-chart card">
                <h3>Daily Breakdown</h3>
                <div className="chart-bars">
                  {analytics.weekly.dailyBreakdown?.map((day, i) => (
                    <div key={i} className="chart-bar-container">
                      <div 
                        className="chart-bar" 
                        style={{ height: `${Math.max((day.questions / 10) * 100, 5)}%` }}
                      >
                        <span className="bar-value">{day.questions}</span>
                      </div>
                      <span className="bar-label">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {analytics.weekly.categoriesPracticed?.length > 0 && (
                <div className="week-categories card">
                  <h3>Categories Practiced This Week</h3>
                  <div className="domain-tags">
                    {analytics.weekly.categoriesPracticed.map((cat, i) => (
                      <span key={i} className="domain-tag">{getDisplayName(cat)}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'monthly' && analytics?.monthly && (
            <div className="monthly-section">
              <div className="period-header">
                <h3>This Month</h3>
                <span className="period-date">
                  {new Date(analytics.monthly.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              <div className="monthly-stats">
                <div className="monthly-stat card">
                  <span className="monthly-stat-value">{analytics.monthly.questionsReviewed}</span>
                  <span className="monthly-stat-label">Questions Reviewed</span>
                </div>
                <div className="monthly-stat card">
                  <span className="monthly-stat-value">{analytics.monthly.interviewsCompleted}</span>
                  <span className="monthly-stat-label">Interviews Completed</span>
                </div>
                <div className="monthly-stat card highlight">
                  <span className="monthly-stat-value">{analytics.monthly.improvement}%</span>
                  <span className="monthly-stat-label">Improvement</span>
                  <span className="improvement-note">vs last month</span>
                </div>
              </div>

              <div className="monthly-comparison card">
                <h3>Weekly Comparison</h3>
                <div className="comparison-bars">
                  {analytics.monthly.weeklyComparison?.map((week, i) => (
                    <div key={i} className="comparison-item">
                      <span className="comparison-week">{week.week}</span>
                      <div className="comparison-bar-bg">
                        <div 
                          className="comparison-bar" 
                          style={{ width: `${(week.questionsReviewed / 20) * 100}%` }}
                        ></div>
                      </div>
                      <span className="comparison-value">{week.questionsReviewed}</span>
                    </div>
                  ))}
                </div>
              </div>

              {analytics.monthly.categoryBreakdown?.length > 0 && (
                <div className="category-breakdown card">
                  <h3>Category Breakdown</h3>
                  <div className="breakdown-list">
                    {analytics.monthly.categoryBreakdown.map((cat, i) => (
                      <div key={i} className="breakdown-item">
                        <span className="breakdown-name">{getDisplayName(cat.name)}</span>
                        <div className="breakdown-bar-bg">
                          <div 
                            className="breakdown-bar" 
                            style={{ width: `${(cat.count / analytics.monthly.categoryBreakdown[0].count) * 100}%` }}
                          ></div>
                        </div>
                        <span className="breakdown-count">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analytics.monthly.categoriesPracticed?.length > 0 && (
                <div className="month-categories card">
                  <h3>Domains Practiced This Month</h3>
                  <div className="domain-tags">
                    {analytics.monthly.categoriesPracticed.map((cat, i) => (
                      <span key={i} className="domain-tag">{getDisplayName(cat)}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;