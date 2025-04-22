const express = require('express');
const router = express.Router();
const {
  getAllFeedback,
  getUserFeedback,
  submitFeedback,
  updateFeedbackStatus
} = require('../controllers/feedbackController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Admin routes
router.get('/admin', protect, restrictTo('admin'), getAllFeedback);
router.patch('/admin/:id/status', protect, restrictTo('admin'), updateFeedbackStatus);

// User routes
router.get('/user', protect, getUserFeedback);
router.post('/', protect, submitFeedback);

module.exports = router; 