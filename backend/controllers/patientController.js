const { getPatientByUserId } = require('../models/Patient');
const { requestAppointment, getAppointmentsByPatient } = require('../models/Appointment');
const { getMedicalHistoryByPatient } = require('../models/MedicalHistory');

const getPatientDashboard = async (req, res) => {
  try {
    const patient = await getPatientByUserId(req.user.id);
    const appointments = await getAppointmentsByPatient(patient.id);
    const medicalHistory = await getMedicalHistoryByPatient(patient.id);

    res.json({ patient, appointments, medicalHistory });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load patient dashboard' });
  }
};

const requestDoctorAppointment = async (req, res) => {
  const { doctorId, nurseId, requestedTime } = req.body;

  try {
    const patient = await getPatientByUserId(req.user.id);

    // Defensive: patient must exist
    if (!patient) {
      console.log('[❌ ERROR] Patient not found for user:', req.user.id);
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Proceed to request appointment
    const appointment = await requestAppointment(
      patient.id,
      doctorId,
      requestedTime,
      nurseId
    );

    res.status(201).json({
      message: 'Appointment requested successfully',
      appointment,
    });
  } catch (err) {
    console.error('[❌ ERROR] Appointment request failed:', err.message);
    res.status(500).json({ error: 'Appointment request failed' });
  }
  console.log('🧠 Creating appointment with:');
console.log('→ Patient ID:', patient.id);
console.log('→ Doctor ID:', doctorId);
console.log('→ Nurse ID:', nurseId);
console.log('→ Requested Time:', requestedTime);

};
module.exports = {
  getPatientDashboard,
  requestDoctorAppointment,
};
