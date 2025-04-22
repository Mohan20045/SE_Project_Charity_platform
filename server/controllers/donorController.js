const Donor = require('../models/donorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Register a new donor
// @route   POST /api/donors/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check if donor exists
    const donorExists = await Donor.findOne({ email });
    if (donorExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Donor already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create donor
    const donor = await Donor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });

    if (donor) {
      res.status(201).json({
        status: 'success',
        data: {
          _id: donor._id,
          name: donor.name,
          email: donor.email,
          phone: donor.phone,
          address: donor.address,
          token: generateToken(donor._id)
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Login donor
// @route   POST /api/donors/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for donor email
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(401).json({
        status: 'error',
        message: 'Email not found. Please check your email or register first.'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect password. Please try again.'
      });
    }

    res.json({
      status: 'success',
      data: {
        _id: donor._id,
        name: donor.name,
        email: donor.email,
        phone: donor.phone,
        address: donor.address,
        token: generateToken(donor._id)
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get donor profile
// @route   GET /api/donors/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const donor = await Donor.findById(req.user._id).select('-password');
    if (!donor) {
      return res.status(404).json({
        status: 'error',
        message: 'Donor not found'
      });
    }
    res.json({
      status: 'success',
      data: donor
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update donor profile
// @route   PATCH /api/donors/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    console.log('Request user:', req.user);
    console.log('Authorization header:', req.headers.authorization);

    const donor = await Donor.findById(req.user._id);

    if (donor) {
      donor.name = req.body.name || donor.name;
      donor.email = req.body.email || donor.email;
      donor.phone = req.body.phone || donor.phone;
      donor.address = req.body.address || donor.address;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        donor.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedDonor = await donor.save();

      res.json({
        status: 'success',
        data: {
          _id: updatedDonor._id,
          name: updatedDonor.name,
          email: updatedDonor.email,
          phone: updatedDonor.phone,
          address: updatedDonor.address,
          token: generateToken(updatedDonor._id)
        }
      });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
}; 