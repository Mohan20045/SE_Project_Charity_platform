const express = require('express');
const router = express.Router();
const {
  getAllDonations,
  getDonorDonations,
  createDonation,
  updateDonationStatus
} = require('../controllers/donationController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Admin routes
router.get('/admin', protect, restrictTo('admin'), getAllDonations);
router.patch('/admin/:id/status', protect, restrictTo('admin'), updateDonationStatus);

// Donor routes
router.get('/donor', protect, getDonorDonations);
router.post('/', protect, createDonation);

module.exports = router; 