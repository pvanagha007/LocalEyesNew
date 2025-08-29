const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// Validation rules for guides
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

// Middleware to handle errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { guideValidationRules, validate };
