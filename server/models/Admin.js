const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Check if model already exists
let Admin;
try {
  Admin = mongoose.model('Admin');
} catch {
  const adminSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide admin name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide admin email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      default: 'admin',
      enum: ['admin', 'superadmin']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  // Encrypt password using bcrypt
  adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  // Sign JWT and return
  adminSchema.methods.getSignedJwtToken = function() {
    return jwt.sign(
      { id: this._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  };

  // Match user entered password to hashed password in database
  adminSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  Admin = mongoose.model('Admin', adminSchema);
}

module.exports = Admin; 