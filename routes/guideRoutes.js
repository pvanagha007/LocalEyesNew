const express = require('express');
const Guide = require('../models/Guide');
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

const router = express.Router();

// Common validation & sanitization rules
const guideValidationRules = [
  body('title')
    .trim()
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters')
    .customSanitizer(value => sanitizeHtml(value)),
  body('content')
    .trim()
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters')
    .customSanitizer(value => sanitizeHtml(value))
];

// Error handling middleware for validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all guides (public)
router.get('/', async (req, res) => {
  try {
    const guides = await Guide.find().populate('createdBy', 'username email -_id');
    res.status(200).json(guides);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE guide (protected + validated)
router.post('/', authMiddleware, guideValidationRules, validate, async (req, res) => {
  try {
    const guide = new Guide({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user.id
    });
    await guide.save();
    res.status(201).json(guide);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE guide (protected + ownership check + validated)
router.put('/:id', authMiddleware, guideValidationRules, validate, async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Guide not found' });

    if (guide.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not allowed to update this guide' });
    }

    guide.title = req.body.title;
    guide.content = req.body.content;

    await guide.save();
    res.status(200).json(guide);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE guide (protected + ownership check)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Guide not found' });

    if (guide.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not allowed to delete this guide' });
    }

    await guide.deleteOne();
    res.status(200).json({ message: 'Guide deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
