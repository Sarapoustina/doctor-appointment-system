const express = require('express');
const router = express.Router();
const { getPatientDashboard, requestDoctorAppointment } = require('../controllers/patientController');
const authenticate = require('../middleware/authMiddleware');

router.get('/dashboard', authenticate, getPatientDashboard);
router.post('/appointments/request', authenticate, requestDoctorAppointment);

module.exports = router;
