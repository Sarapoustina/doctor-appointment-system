const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');
const {
  getDoctorDashboard,
  addRecordForPatient,
  getPatientHistory
} = require('../controllers/doctorController');

router.use(authenticate);
router.use(authorizeRole(['doctor']));

router.get('/dashboard', getDoctorDashboard);
router.post('/patients/record', addRecordForPatient);
router.get('/patients/:patientId/history', getPatientHistory);

module.exports = router;

