import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content fade-in">
          <h1>Master Your Next <span>Interview</span></h1>
          <p>Practice with domain-specific questions from top companies and get hired</p>
          {!user ? (
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">Get Started Free</Link>
              <Link to="/login" className="btn-secondary">Sign In</Link>
            </div>
          ) : (
            <Link to="/questions" className="btn-primary">Start Practicing</Link>
          )}
        </div>
      </section>

      <section className="features section">
        <div className="container">
          <h2>Why Choose MockPro?</h2>
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">📚</div>
              <h3>Domain-Specific Questions</h3>
              <p>Practice questions tailored to your domain - Web Dev, Data Science, DevOps, Mobile, and more.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🎯</div>
              <h3>AI Resume Analysis</h3>
              <p>Upload your resume and get instant feedback to improve your chances.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">⏱️</div>
              <h3>Mock Interview Simulator</h3>
              <p>Timed practice sessions with random questions from multiple categories.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📊</div>
              <h3>Track Your Progress</h3>
              <p>Monitor your learning journey with detailed statistics and insights.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="domains section">
        <div className="container">
          <h2>Supported Domains</h2>
          <div className="domains-grid">
            <div className="domain-card card">
              <span className="domain-icon">🌐</span>
              <h4>Web Development</h4>
            </div>
            <div className="domain-card card">
              <span className="domain-icon">📊</span>
              <h4>Data Science & ML</h4>
            </div>
            <div className="domain-card card">
              <span className="domain-icon">☁️</span>
              <h4>DevOps & Cloud</h4>
            </div>
            <div className="domain-card card">
              <span className="domain-icon">📱</span>
              <h4>Mobile Development</h4>
            </div>
            <div className="domain-card card">
              <span className="domain-icon">🗄️</span>
              <h4>Database</h4>
            </div>
            <div className="domain-card card">
              <span className="domain-icon">⚙️</span>
              <h4>System Design</h4>
            </div>
            <div className="domain-card card">
              <span className="domain-icon">💻</span>
              <h4>Coding & Algorithms</h4>
            </div>
            <div className="domain-card card">
              <span className="domain-icon">🎭</span>
              <h4>Behavioral</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Ace Your Interview?</h2>
            <p>Join thousands of candidates who have improved their interview skills with MockPro.</p>
            {!user && (
              <Link to="/register" className="btn-primary">Create Free Account</Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;