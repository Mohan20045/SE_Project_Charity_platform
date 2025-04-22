const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');
const {
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
} = require('../controllers/adminController');

// Public routes
router.post('/login', login);

// Protected routes
router.use(protect);
router.use(restrictTo('admin'));

router.get('/profile', getProfile);
router.get('/donors', getAllDonors);
router.get('/organizations', getAllOrganizations);
router.get('/donations', getAllDonations);
router.patch('/donations/:id/status', updateDonationStatus);

router.get('/stats', getStats);

// User management routes
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Organization management routes
router.route('/organizations')
  .get(getAllOrganizations)
  .post(createOrganization);

router.route('/organizations/:id')
  .get(getOrganizationById)
  .put(updateOrganization)
  .delete(deleteOrganization);

module.exports = router; 