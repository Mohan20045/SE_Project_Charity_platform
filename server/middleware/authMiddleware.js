const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Donor = require('../models/Donor');
const Admin = require('../models/Admin');

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    // 1) Get token and check if it exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in. Please log in to get access.'
      });
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug log

    // 3) Check if user still exists
    const donor = await Donor.findById(decoded.id);
    const admin = await Admin.findById(decoded.id);

    console.log('Authenticated donor:', donor); // Debug log
    console.log('Authenticated admin:', admin); // Debug log

    if (!donor && !admin) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // 4) Grant access to protected route
    req.user = donor || admin;

    // Additional check: if req.user is undefined, send error
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed: user not found.'
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error); // Log error
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in. Please log in to get access.'
    });
  }
};

// Restrict to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
}; 