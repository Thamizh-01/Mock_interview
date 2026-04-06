const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('progress');
    res.json({ progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/mark-reviewed', auth, async (req, res) => {
  try {
    const { questionId, category, timeSpent = 0 } = req.body;
    
    const user = await User.findById(req.user._id);
    
    user.progress.questionsReviewed += 1;
    
    if (category && !user.progress.categoriesPracticed.includes(category)) {
      user.progress.categoriesPracticed.push(category);
    }
    
    user.progress.totalTimeSpent += timeSpent;
    
    user.activities.push({
      type: 'question_reviewed',
      category,
      details: { questionId, timeSpent }
    });
    
    if (user.activities.length > 500) {
      user.activities = user.activities.slice(-500);
    }
    
    await user.save();
    
    res.json({ 
      message: 'Question marked as reviewed',
      progress: user.progress 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/complete-interview', auth, async (req, res) => {
  try {
    const { timeSpent = 0, score = 0, categories = [] } = req.body;
    
    const user = await User.findById(req.user._id);
    
    user.progress.mockInterviewsCompleted += 1;
    user.progress.totalTimeSpent += timeSpent;
    
    if (score > 0) {
      const currentAvg = user.progress.averageScore;
      const total = user.progress.mockInterviewsCompleted;
      user.progress.averageScore = ((currentAvg * (total - 1)) + score) / total;
    }
    
    categories.forEach(cat => {
      if (!user.progress.categoriesPracticed.includes(cat)) {
        user.progress.categoriesPracticed.push(cat);
      }
    });
    
    user.activities.push({
      type: 'interview_completed',
      details: { timeSpent, score, categories }
    });
    
    if (user.activities.length > 500) {
      user.activities = user.activities.slice(-500);
    }
    
    await user.save();
    
    res.json({ 
      message: 'Interview completed',
      progress: user.progress 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/analyze-resume', auth, async (req, res) => {
  try {
    const { score = 0 } = req.body;
    
    const user = await User.findById(req.user._id);
    
    user.resume.score = score;
    user.resume.lastAnalyzed = new Date();
    
    user.activities.push({
      type: 'resume_analyzed',
      details: { score }
    });
    
    await user.save();
    
    res.json({ 
      message: 'Resume analyzed',
      progress: user.progress 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/reset', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.progress = {
      questionsReviewed: 0,
      categoriesPracticed: [],
      mockInterviewsCompleted: 0,
      totalTimeSpent: 0,
      averageScore: 0
    };
    
    user.activities = [];
    user.weeklyProgress = [];
    user.monthlyProgress = [];
    
    await user.save();
    
    res.json({ 
      message: 'Progress reset successfully',
      progress: user.progress 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;