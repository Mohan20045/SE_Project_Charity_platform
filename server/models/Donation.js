const mongoose = require('mongoose');

// Check if model already exists
let Donation;
try {
  Donation = mongoose.model('Donation');
} catch {
  const donationSchema = new mongoose.Schema({
    donorId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Donor',
      required: [true, 'Donor ID is required']
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organization',
      required: [true, 'Organization ID is required']
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [1, 'Amount must be at least 1']
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    transactionId: {
      type: String
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'net_banking', 'upi'],
      required: [true, 'Payment method is required']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  Donation = mongoose.model('Donation', donationSchema);
}

module.exports = Donation; 