const Feedback = require('../models/Feedback');

// Get all feedback (admin only)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('userId', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: feedback.length,
      data: {
        feedback
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get user's feedback
exports.getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ donorId: req.user.id })
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: feedback.length,
      data: {
        feedback
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { category, message } = req.body;

    const feedback = await Feedback.create({
      donorId: req.user.id,
      category,
      message,
      status: 'pending'
    });

    res.status(201).json({
      status: 'success',
      data: {
        feedback
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update feedback status (admin only)
exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (!feedback) {
      return res.status(404).json({
        status: 'error',
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        feedback
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 