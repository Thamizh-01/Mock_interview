const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

const getMonthStart = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const now = new Date();
    const weekStart = getWeekStart(now);
    const monthStart = getMonthStart(now);
    
    const weeklyActivities = user.activities.filter(a => new Date(a.date) >= weekStart);
    const monthlyActivities = user.activities.filter(a => new Date(a.date) >= monthStart);
    
    const weeklyData = {
      period: 'This Week',
      startDate: weekStart,
      questionsReviewed: weeklyActivities.filter(a => a.type === 'question_reviewed').length,
      interviewsCompleted: weeklyActivities.filter(a => a.type === 'interview_completed').length,
      categoriesPracticed: [...new Set(weeklyActivities.map(a => a.category).filter(Boolean))],
      totalTimeSpent: weeklyActivities.reduce((sum, a) => sum + (a.details?.timeSpent || 0), 0),
      dailyBreakdown: getDailyBreakdown(weeklyActivities, weekStart)
    };
    
    const lastMonthStart = new Date(monthStart);
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    const lastMonthActivities = user.activities.filter(a => {
      const d = new Date(a.date);
      return d >= lastMonthStart && d < monthStart;
    });
    
    const monthlyData = {
      period: 'This Month',
      startDate: monthStart,
      questionsReviewed: monthlyActivities.length,
      interviewsCompleted: monthlyActivities.filter(a => a.type === 'interview_completed').length,
      categoriesPracticed: [...new Set(monthlyActivities.map(a => a.category).filter(Boolean))],
      weeklyComparison: getWeeklyComparison(user.activities),
      categoryBreakdown: getCategoryBreakdown(monthlyActivities)
    };
    
    const previousMonthStart = new Date(monthStart);
    previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);
    const previousMonthActivities = user.activities.filter(a => {
      const d = new Date(a.date);
      return d >= previousMonthStart && d < monthStart;
    });
    
    const previousCount = previousMonthActivities.length;
    const currentCount = monthlyActivities.length;
    const improvement = previousCount > 0 ? ((currentCount - previousCount) / previousCount * 100).toFixed(1) : 0;
    
    monthlyData.improvement = parseFloat(improvement);
    monthlyData.previousMonthCount = previousCount;
    
    res.json({
      overview: user.progress,
      weekly: weeklyData,
      monthly: monthlyData,
      recentActivities: user.activities.slice(-10).reverse()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

function getDailyBreakdown(activities, weekStart) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const dayStart = new Date(weekStart);
    dayStart.setDate(dayStart.getDate() + i);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    
    const dayActivities = activities.filter(a => {
      const d = new Date(a.date);
      return d >= dayStart && d < dayEnd;
    });
    
    days.push({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      date: dayStart.toISOString().split('T')[0],
      questions: dayActivities.filter(a => a.type === 'question_reviewed').length,
      interviews: dayActivities.filter(a => a.type === 'interview_completed').length
    });
  }
  return days;
}

function getWeeklyComparison(activities) {
  const weeks = [];
  const now = new Date();
  
  for (let i = 3; i >= 0; i--) {
    const weekStart = getWeekStart(new Date(now));
    weekStart.setDate(weekStart.getDate() - (i * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    
    const weekActivities = activities.filter(a => {
      const d = new Date(a.date);
      return d >= weekStart && d < weekEnd;
    });
    
    weeks.push({
      week: `Week ${getWeekNumber(weekStart)}`,
      questionsReviewed: weekActivities.filter(a => a.type === 'question_reviewed').length,
      interviewsCompleted: weekActivities.filter(a => a.type === 'interview_completed').length
    });
  }
  
  return weeks;
}

function getCategoryBreakdown(activities) {
  const categories = {};
  activities.forEach(a => {
    if (a.category) {
      categories[a.category] = (categories[a.category] || 0) + 1;
    }
  });
  
  return Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

router.get('/history', auth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    const user = await User.findById(req.user._id);
    
    const now = new Date();
    let startDate;
    
    if (period === 'week') {
      startDate = getWeekStart(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
    } else if (period === 'month') {
      startDate = getMonthStart(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
    } else if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else {
      startDate = new Date(0);
    }
    
    const filteredActivities = user.activities.filter(a => new Date(a.date) >= startDate);
    
    res.json({ activities: filteredActivities.reverse() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;