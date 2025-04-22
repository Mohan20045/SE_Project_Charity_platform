const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Check if model already exists
let Donor;
try {
  Donor = mongoose.model('Donor');
} catch {
  const donorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number']
    },
    address: {
      type: String,
      required: [true, 'Please provide an address']
    },
    role: {
      type: String,
      enum: ['donor'],
      default: 'donor'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  // Encrypt password using bcrypt
  donorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  // Sign JWT and return
  donorSchema.methods.getSignedJwtToken = function() {
    return jwt.sign(
      { id: this._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  };

  // Match user entered password to hashed password in database
  donorSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  Donor = mongoose.model('Donor', donorSchema);
}

module.exports = Donor; 