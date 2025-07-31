const { getDoctorByUserId } = require('../models/Doctor');
const { getAppointmentsByDoctor } = require('../models/Appointment');
const { addMedicalRecord, getMedicalHistoryForDoctor } = require('../models/MedicalHistory');

const getDoctorDashboard = async (req, res) => {
  try {
    const doctor = await getDoctorByUserId(req.user.id);
    const appointments = await getAppointmentsByDoctor(doctor.id);

    res.json({ doctor, appointments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load doctor dashboard' });
  }
};

const addRecordForPatient = async (req, res) => {
  const { patientId, record } = req.body;

  try {
    const doctor = await getDoctorByUserId(req.user.id);
    const history = await addMedicalRecord(patientId, doctor.id, record);

    res.status(201).json({ message: 'Record added', history });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add medical record' });
  }
};

const getPatientHistory = async (req, res) => {
  const { patientId } = req.params;

  try {
    const doctor = await getDoctorByUserId(req.user.id);
    const history = await getMedicalHistoryForDoctor(doctor.id, patientId);

    res.json({ history });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load patient history' });
  }
};

module.exports = {
  getDoctorDashboard,
  addRecordForPatient,
  getPatientHistory,
};
