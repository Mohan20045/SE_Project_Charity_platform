const Donation = require('../models/Donation');
const Organization = require('../models/Organization');
const Donor = require('../models/donorModel');

// Get all donations (admin only)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donorId', 'name email')
      .populate('organizationId', 'name')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: donations.length,
      data: {
        donations
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get donor's donations
exports.getDonorDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user.id })
      .populate('organizationId', 'name')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: donations.length,
      data: {
        donations
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create new donation
exports.createDonation = async (req, res) => {
  try {
    const { organizationId, amount, paymentMethod } = req.body;

    // Check if organization exists
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({
        status: 'error',
        message: 'Organization not found'
      });
    }

    const donation = await Donation.create({
      donorId: req.user.id,
      organizationId,
      amount,
      paymentMethod,
      status: 'pending'
    });

    // Populate organization details
    await donation.populate('organizationId', 'name');

    res.status(201).json({
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

// Update donation status (admin only)
exports.updateDonationStatus = async (req, res) => {
  try {
    const { status, transactionId } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status, transactionId },
      { new: true, runValidators: true }
    ).populate('organizationId', 'name');

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