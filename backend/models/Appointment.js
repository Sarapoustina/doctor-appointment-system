const db = require('./db');

const requestAppointment = async (patientId, doctorId, requestedTime, nurseId) => {
  const result = await db.query(
    `INSERT INTO appointments (patient_id, doctor_id, requested_time, nurse_id, status)
     VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
    [patientId, doctorId, requestedTime, nurseId]
  );
  return result.rows[0];
};

const updateAppointmentStatus = async (id, status, approvedTime = null) => {
  const result = await db.query(
    `UPDATE appointments SET status = $1, approved_time = $2 WHERE id = $3 RETURNING *`,
    [status, approvedTime, id]
  );
  return result.rows[0];
};

const getAppointmentsByPatient = async (patientId) => {
  const result = await db.query(`SELECT * FROM appointments WHERE patient_id = $1 ORDER BY created_at DESC`, [patientId]);
  return result.rows;
};

const getAppointmentsByDoctor = async (doctorId) => {
  const result = await db.query(`SELECT * FROM appointments WHERE doctor_id = $1 AND status = 'approved' ORDER BY approved_time`, [doctorId]);
  return result.rows;
};

const getPendingAppointmentsForNurse = async (nurseId) => {
  const result = await db.query(`SELECT * FROM appointments WHERE nurse_id = $1 AND status = 'pending' ORDER BY requested_time`, [nurseId]);
  return result.rows;
};

module.exports = {
  requestAppointment,
  updateAppointmentStatus,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  getPendingAppointmentsForNurse,
};
