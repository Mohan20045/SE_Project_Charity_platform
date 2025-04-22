const Admin = require('../models/Admin');
const Donor = require('../models/Donor');
const Organization = require('../models/Organization');
const Donation = require('../models/Donation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login admin
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Check if admin exists and password is correct
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password'
      });
    }

    // Create token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Remove password from output
    admin.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        admin
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get admin profile
const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        admin
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get all donors
const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json({
      status: 'success',
      results: donors.length,
      data: {
        donors
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get all organizations
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json({
      status: 'success',
      results: organizations.length,
      data: {
        organizations
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get all donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donorId', 'name email')
      .populate('organizationId', 'name');
    
    res.status(200).json({
      status: 'success',
      results: donations.length,
      data: {
        donations
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update donation status
const updateDonationStatus = async (req, res) => {
  try {
    const { status, transactionId } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status, transactionId },
      { new: true, runValidators: true }
    );

    if (!donation) {
      return res.status(404).json({
        status: 'error',
        message: 'Donation not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        donation
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Donor.find({}).select('-password');
    res.json({
      status: 'success',
      data: users
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await Donor.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    res.json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await Donor.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      status: 'success',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await Donor.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    await user.remove();
    res.json({
      status: 'success',
      message: 'User removed'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get organization by ID
const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({
        status: 'error',
        message: 'Organization not found'
      });
    }
    res.json({
      status: 'success',
      data: organization
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create organization
const createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).json({
      status: 'success',
      data: organization
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update organization
const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({
        status: 'error',
        message: 'Organization not found'
      });
    }

    Object.assign(organization, req.body);
    const updatedOrganization = await organization.save();

    res.json({
      status: 'success',
      data: updatedOrganization
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete organization
const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({
        status: 'error',
        message: 'Organization not found'
      });
    }

    await organization.remove();
    res.json({
      status: 'success',
      message: 'Organization removed'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// New getStats function
const getStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalAmountResult = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    const totalAmount = totalAmountResult[0]?.totalAmount || 0;
    const totalOrganizations = await Organization.countDocuments();
    const totalUsers = await Donor.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        totalDonations,
        totalAmount,
        totalOrganizations,
        totalUsers
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  login,
  getProfile,
  getAllDonors,
  getAllOrganizations,
  getAllDonations,
  updateDonationStatus,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getStats
};
