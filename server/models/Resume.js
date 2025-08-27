const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: String,
  endDate: String,
  current: Boolean,
  description: String
});

const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  field: String,
  startDate: String,
  endDate: String,
  gpa: String
});

const SkillSchema = new mongoose.Schema({
  name: String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  }
});

const PersonalInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  summary: String
});

const ResumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Resume'
  },
  template: {
    type: String,
    default: 'modern'
  },
  personalInfo: PersonalInfoSchema,
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [SkillSchema],
  status: {
    type: String,
    enum: ['draft', 'completed'],
    default: 'draft'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);