const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const User = require('../models/User');

let pdfParse;
let mammoth;
let PDFDocument;

try {
  pdfParse = require('pdf-parse');
  mammoth = require('mammoth');
  PDFDocument = require('pdfkit');
} catch (e) {
  console.log('PDF parsing libraries not available');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (ext) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
  }
};

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

async function parseResume(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  let text = '';
  
  try {
    if (ext === '.pdf' && pdfParse) {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if ((ext === '.doc' || ext === '.docx') && mammoth) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      // Fallback: read as text for txt files
      text = fs.readFileSync(filePath, 'utf8');
    }
  } catch (err) {
    console.error('Error parsing resume:', err);
    text = '';
  }
  
  return text;
}

function analyzeResumeText(text) {
  const analysis = {
    contactInfo: {},
    sections: {},
    keywords: {
      found: [],
      missing: []
    },
    atsScore: 0,
    score: 0,
    strengths: [],
    improvements: [],
    atsTips: [],
    summary: ''
  };
  
  if (!text || text.trim().length < 50) {
    return {
      score: 30,
      atsScore: 20,
      strengths: ['File uploaded successfully'],
      improvements: ['Unable to extract text from resume. Please ensure file is not password protected.'],
      foundKeywords: [],
      missingKeywords: ['contact information', 'work experience', 'education', 'skills'],
      atsTips: ['Ensure file is not corrupted', 'Try using a different file format'],
      summary: 'Unable to analyze resume. Please upload a valid PDF or Word document.'
    };
  }
  
  // Extract contact information patterns
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9-]+/i);
  
  if (emailMatch) analysis.contactInfo.email = emailMatch[0];
  if (phoneMatch) analysis.contactInfo.phone = phoneMatch[0];
  if (linkedinMatch) analysis.contactInfo.linkedin = linkedinMatch[0];
  
  // Detect sections
  const sectionPatterns = {
    'Summary': /(?:summary|profile|objective|about me)[\s:]+/i,
    'Experience': /(?:experience|employment|work history|professional experience)[\s:]+/i,
    'Education': /(?:education|academic|degree|qualification)[\s:]+/i,
    'Skills': /(?:skills|technologies|competencies|technical skills)[\s:]+/i,
    'Projects': /(?:projects|portfolio)[\s:]+/i,
    'Certifications': /(?:certifications|certificates|licenses)[\s:]+/i
  };
  
  for (const [section, pattern] of Object.entries(sectionPatterns)) {
    analysis.sections[section] = pattern.test(text);
  }
  
  // Important ATS keywords by category
  const keywordCategories = {
    'Technical Skills': ['javascript', 'python', 'java', 'react', 'node', 'sql', 'aws', 'docker', 'kubernetes', 'git'],
    'Soft Skills': ['leadership', 'communication', 'teamwork', 'problem-solving', 'analytical', 'collaboration'],
    'Action Verbs': ['managed', 'developed', 'implemented', 'created', 'led', 'optimized', 'analyzed', 'designed'],
    'Metrics': ['increased', 'decreased', 'improved', 'reduced', 'achieved', 'delivered', 'delivered', 'completed']
  };
  
  const textLower = text.toLowerCase();
  const foundKeywords = [];
  const missingKeywords = [];
  
  // Check for key technical skills
  const techKeywords = ['javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 
    'sql', 'mysql', 'postgresql', 'mongodb', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'git', 'jenkins', 'ci/cd',
    'rest', 'api', 'graphql', 'html', 'css', 'typescript', 'ruby', 'php', 'golang', 'rust'];
  
  const softKeywords = ['leadership', 'teamwork', 'communication', 'problem-solving', 'analytical', 'collaboration',
    'project management', 'agile', 'scrum', 'time management', 'adaptability'];
  
  for (const kw of techKeywords) {
    if (textLower.includes(kw)) {
      foundKeywords.push(kw);
    }
  }
  
  for (const kw of softKeywords.slice(0, 5)) {
    if (textLower.includes(kw)) {
      foundKeywords.push(kw);
    }
  }
  
  // Missing important keywords
  const criticalKeywords = ['contact', 'email', 'education', 'experience', 'skills'];
  for (const kw of criticalKeywords) {
    if (!textLower.includes(kw)) {
      missingKeywords.push(kw);
    }
  }
  
  // Calculate ATS score based on various factors
  let atsScore = 0;
  
  // Has contact info (30 points)
  if (analysis.contactInfo.email) atsScore += 15;
  if (analysis.contactInfo.phone) atsScore += 10;
  if (analysis.contactInfo.linkedin) atsScore += 5;
  
  // Has required sections (40 points)
  if (analysis.sections['Experience']) atsScore += 15;
  if (analysis.sections['Education']) atsScore += 10;
  if (analysis.sections['Skills']) atsScore += 15;
  
  // Keyword density (20 points)
  const keywordDensity = foundKeywords.length / 20;
  atsScore += Math.min(20, Math.floor(keywordDensity * 20));
  
  // File format compatibility (10 points)
  atsScore += 10;
  
  // Calculate overall score
  let score = 0;
  
  // Contact info (20 points)
  if (analysis.contactInfo.email && analysis.contactInfo.phone) score += 20;
  else if (analysis.contactInfo.email) score += 10;
  
  // Sections present (30 points)
  const sectionCount = Object.values(analysis.sections).filter(v => v).length;
  score += Math.min(30, sectionCount * 6);
  
  // Keywords (30 points)
  const kwScore = Math.min(30, Math.floor((foundKeywords.length / 15) * 30));
  score += kwScore;
  
  // Content length (20 points)
  const wordCount = text.split(/\s+/).length;
  if (wordCount >= 300 && wordCount <= 1500) score += 20;
  else if (wordCount >= 150) score += 10;
  
  // Generate strengths
  if (analysis.contactInfo.email) analysis.strengths.push('Professional email address present');
  if (analysis.contactInfo.phone) analysis.strengths.push('Phone number included');
  if (analysis.contactInfo.linkedin) analysis.strengths.push('LinkedIn profile link found');
  if (analysis.sections['Experience']) analysis.strengths.push('Clear work experience section');
  if (analysis.sections['Education']) analysis.strengths.push('Education section included');
  if (analysis.sections['Skills']) analysis.strengths.push('Skills section present');
  if (foundKeywords.length >= 10) analysis.strengths.push('Good technical keyword coverage');
  if (textLower.includes('achieved') || textLower.includes('managed')) analysis.strengths.push('Uses action-oriented language');
  
  // Generate improvements
  if (!analysis.contactInfo.email) analysis.improvements.push('Add a professional email address');
  if (!analysis.contactInfo.phone) analysis.improvements.push('Include phone number');
  if (!analysis.contactInfo.linkedin) analysis.improvements.push('Add LinkedIn profile URL');
  if (!analysis.sections['Summary']) analysis.improvements.push('Add a professional summary/objective');
  if (!analysis.sections['Skills']) analysis.improvements.push('Include a skills section with relevant technologies');
  if (missingKeywords.length > 2) analysis.improvements.push('Add more relevant keywords from job descriptions');
  if (!textLower.includes('achieved') && !textLower.includes('managed')) analysis.improvements.push('Use more action verbs to describe achievements');
  if (wordCount < 200) analysis.improvements.push('Resume appears too short - add more detail');
  if (wordCount > 1500) analysis.improvements.push('Consider condensing resume to one page');
  
  // ATS Tips
  analysis.atsTips = [
    'Use standard section headings (Experience, Education, Skills)',
    'Keep formatting simple - avoid tables, columns, and text boxes',
    'Use standard file naming: FirstName_LastName_Resume.pdf',
    'Include keywords from job description naturally in content',
    'Avoid special characters and symbols in key sections',
    'Use standard fonts like Arial, Calibri, or Times New Roman',
    'Save as PDF to preserve formatting across systems'
  ];
  
  // Summary
  analysis.summary = `Resume analysis complete. Your resume scored ${score}/100 with ${atsScore}% ATS compatibility. ` +
    `Found ${foundKeywords.length} relevant keywords. ${analysis.strengths.length > analysis.improvements.length ? 
    'Strong overall structure with good content coverage.' : 'Focus on improving sections mentioned above for better results.'}`;
  
  analysis.foundKeywords = foundKeywords;
  analysis.missingKeywords = missingKeywords;
  analysis.score = score;
  analysis.atsScore = atsScore;
  
  return analysis;
}

router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const user = await User.findById(req.user._id);
    user.resume.uploaded = true;
    user.resume.lastAnalyzed = new Date();
    user.resume.filename = req.file.filename;
    await user.save();
    
    // If analyze flag is set, analyze immediately
    if (req.body.analyze === 'true') {
      const filePath = path.join(__dirname, '..', 'uploads', user.resume.filename);
      
      if (!fs.existsSync(filePath)) {
        return res.status(400).json({ message: 'File not found. Please upload again.' });
      }
      
      const text = await parseResume(filePath);
      const analysis = analyzeResumeText(text);
      analysis.analyzedAt = new Date();
      
      user.resume.score = analysis.score;
      user.resume.analysisData = analysis;
      user.resume.lastAnalyzed = new Date();
      await user.save();
      
      return res.json({ 
        message: 'Resume analyzed successfully',
        analysis
      });
    }
    
    res.json({ 
      message: 'Resume uploaded successfully',
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/analyze', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.resume.filename) {
      return res.status(400).json({ message: 'No resume uploaded. Please upload a resume first and click Analyze.' });
    }
    
    const filePath = path.join(__dirname, '..', 'uploads', user.resume.filename);
    
    if (!fs.existsSync(filePath)) {
      // Clear the old filename and ask to re-upload
      user.resume.filename = null;
      await user.save();
      return res.status(400).json({ message: 'Previous file not found. Please upload your resume again.' });
    }
    
    const text = await parseResume(filePath);
    const analysis = analyzeResumeText(text);
    analysis.analyzedAt = new Date();
    
    user.resume.score = analysis.score;
    user.resume.analysisData = analysis;
    user.resume.lastAnalyzed = new Date();
    await user.save();
    
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/analysis', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('resume');
    
    if (!user.resume.analysisData) {
      return res.status(404).json({ message: 'No analysis found. Please upload and analyze your resume first.' });
    }
    
    res.json({ analysis: user.resume.analysisData });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/report/pdf', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('resume');
    
    if (!user.resume.analysisData) {
      return res.status(404).json({ message: 'No analysis found. Please upload and analyze your resume first.' });
    }
    
    const analysis = user.resume.analysisData;
    
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Resume_Analysis_Report.pdf');
    
    doc.pipe(res);
    
    doc.fontSize(24).text('Resume Analysis Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(18).text('Overall Score');
    doc.fontSize(36).text(`${analysis.score}/100`, { align: 'center' });
    doc.fontSize(14).text(`ATS Compatibility: ${analysis.atsScore}%`, { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(16).text('Strengths', { underline: true });
    doc.fontSize(12);
    analysis.strengths.forEach((s, i) => {
      doc.text(`${i + 1}. ${s}`);
    });
    doc.moveDown();
    
    doc.fontSize(16).text('Areas for Improvement', { underline: true });
    doc.fontSize(12);
    analysis.improvements.forEach((i, idx) => {
      doc.text(`${idx + 1}. ${i}`);
    });
    doc.moveDown();
    
    doc.fontSize(16).text('Keyword Analysis', { underline: true });
    doc.fontSize(12);
    doc.text('Found Keywords: ' + (analysis.foundKeywords?.join(', ') || 'None'));
    doc.text('Missing Keywords: ' + (analysis.missingKeywords?.join(', ') || 'None'));
    doc.moveDown();
    
    doc.fontSize(16).text('ATS Tips', { underline: true });
    doc.fontSize(12);
    analysis.atsTips?.forEach((t, i) => {
      doc.text(`${i + 1}. ${t}`);
    });
    doc.moveDown();
    
    doc.fontSize(16).text('Summary', { underline: true });
    doc.fontSize(12).text(analysis.summary || 'No summary available.');
    
    doc.end();
    
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ message: 'Error generating PDF report', error: error.message });
  }
});

module.exports = router;