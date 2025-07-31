const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const {
  getPendingRequests,
  updateRequestStatus
} = require('../controllers/nurseController');

router.use(authenticate);
router.use(authorizeRole(['nurse']));

router.get('/requests', getPendingRequests);
router.put('/requests/:appointmentId/status', updateRequestStatus);

module.exports = router;
