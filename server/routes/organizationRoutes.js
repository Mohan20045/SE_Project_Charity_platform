const express = require('express');
const router = express.Router();
const {
  getAllOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization
} = require('../controllers/organizationController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllOrganizations);
router.get('/:id', getOrganization);

// Protected routes (admin only)
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', createOrganization);
router.patch('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);

module.exports = router;
