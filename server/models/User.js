const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const activitySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['question_reviewed', 'interview_completed', 'resume_analyzed', 'category_practiced'] },
  category: String,
  details: mongoose.Schema.Types.Mixed
});

const weeklyProgressSchema = new mongoose.Schema({
  weekStart: Date,
  questionsReviewed: { type: Number, default: 0 },
  interviewsCompleted: { type: Number, default: 0 },
  categoriesPracticed: [String],
  totalTimeSpent: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 }
});

const monthlyProgressSchema = new mongoose.Schema({
  monthStart: Date,
  questionsReviewed: { type: Number, default: 0 },
  interviewsCompleted: { type: Number, default: 0 },
  categoriesPracticed: [String],
  averageScore: { type: Number, default: 0 },
  topCategory: String,
  improvement: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  progress: {
    questionsReviewed: { type: Number, default: 0 },
    categoriesPracticed: [{ type: String }],
    mockInterviewsCompleted: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 }
  },
  activities: [activitySchema],
  weeklyProgress: [weeklyProgressSchema],
  monthlyProgress: [monthlyProgressSchema],
  resume: {
    uploaded: { type: Boolean, default: false },
    lastAnalyzed: Date,
    score: Number,
    analysisData: mongoose.Schema.Types.Mixed
  },
  preferences: {
    targetRoles: [String],
    experienceLevel: String,
    focusAreas: [String]
  },
  lastActivityDate: Date
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);