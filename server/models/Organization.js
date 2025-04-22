const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide organization name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide organization description']
  },
  email: {
    type: String,
    required: [true, 'Please provide organization email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide organization phone number']
  },
  address: {
    type: String,
    required: [true, 'Please provide organization address']
  },
  website: {
    type: String,
    required: [true, 'Please provide organization website']
  },
  category: {
    type: String,
    required: [true, 'Please provide organization category'],
    enum: ['Disaster Relief', 'Children Welfare', 'Food Security', 'Healthcare', 'Education', 'Environment', 'Other']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Organization', organizationSchema); 