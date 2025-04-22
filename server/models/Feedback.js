const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  message: {
    type: String,
    required: [true, 'Please provide feedback message'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide feedback category'],
    enum: ['general', 'technical', 'suggestion', 'complaint']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback; 