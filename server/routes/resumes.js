const express = require('express');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all resumes for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId })
      .select('title template status createdAt updatedAt')
      .sort({ updatedAt: -1 });

    // Format response
    const formattedResumes = resumes.map(resume => ({
      _id: resume._id,
      title: resume.title,
      template: resume.template,
      status: resume.status,
      lastModified: resume.updatedAt
    }));

    res.json(formattedResumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single resume
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new resume
router.post('/', auth, async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      userId: req.userId,
      status: 'draft'
    };

    const resume = new Resume(resumeData);
    await resume.save();

    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update resume
router.put('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body, status: 'completed' },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;