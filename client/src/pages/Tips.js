import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Tips = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const tips = [
    {
      title: 'Research the Company',
      description: 'Study the company\'s mission, values, recent news, and culture before your interview. Know what they do and their recent achievements.',
      icon: '🔍'
    },
    {
      title: 'Use the STAR Method',
      description: 'Structure behavioral answers with Situation, Task, Action, and Result. This helps you give complete, structured answers.',
      icon: '📋'
    },
    {
      title: 'Practice Out Loud',
      description: 'Rehearse your answers verbally to build confidence. Practice with a friend or in front of a mirror to refine your delivery.',
      icon: '🎤'
    },
    {
      title: 'Prepare Questions',
      description: 'Have thoughtful questions ready for the interviewer about the role, team, and company. This shows genuine interest.',
      icon: '❓'
    },
    {
      title: 'Dress Professionally',
      description: 'Choose appropriate attire that matches the company culture. When in doubt, err on the side of being more formal.',
      icon: '👔'
    },
    {
      title: 'Follow Up',
      description: 'Send a thank-you email within 24 hours of your interview. Reference specific topics discussed to stand out.',
      icon: '📧'
    },
    {
      title: 'Know Your Resume',
      description: 'Be prepared to discuss every item on your resume in detail. Know your projects, technologies used, and outcomes.',
      icon: '📄'
    },
    {
      title: 'Body Language Matters',
      description: 'Maintain eye contact, sit upright, and smile. Non-verbal cues often make the strongest impression.',
      icon: '🤝'
    },
    {
      title: 'Prepare for Technical Questions',
      description: 'Review fundamentals in your domain. Practice coding problems, system design concepts, and domain-specific knowledge.',
      icon: '💻'
    },
    {
      title: 'Ask for Clarification',
      description: 'If a question is unclear, don\'t hesitate to ask for clarification. It\'s better to understand the question than to answer incorrectly.',
      icon: '🗣️'
    },
    {
      title: 'Think Before You Speak',
      description: 'Take a moment to organize your thoughts before answering complex questions. It\'s okay to pause briefly.',
      icon: '🧠'
    },
    {
      title: 'Be Honest',
      description: 'If you don\'t know something, admit it honestly. Interviewers appreciate humility and a willingness to learn.',
      icon: '✅'
    }
  ];

  return (
    <div className="tips-page section">
      <div className="container">
        <h2 className="text-center mb-2">Interview Tips</h2>
        <p className="text-center text-muted mb-4">Expert advice to help you succeed</p>

        <div className="tips-grid">
          {tips.map((tip, index) => (
            <div key={index} className="tip-card card">
              <div className="tip-icon">{tip.icon}</div>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;