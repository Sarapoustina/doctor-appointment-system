const db = require('./db');

const addMedicalRecord = async (patientId, doctorId, record) => {
  const result = await db.query(
    `INSERT INTO medical_histories (patient_id, doctor_id, record)
     VALUES ($1, $2, $3) RETURNING *`,
    [patientId, doctorId, record]
  );
  return result.rows[0];
};

const getMedicalHistoryByPatient = async (patientId) => {
  const result = await db.query(
    `SELECT * FROM medical_histories WHERE patient_id = $1 ORDER BY created_at DESC`,
    [patientId]
  );
  return result.rows;
};

const getMedicalHistoryForDoctor = async (doctorId, patientId) => {
  const result = await db.query(
    `SELECT * FROM medical_histories WHERE doctor_id = $1 AND patient_id = $2 ORDER BY created_at DESC`,
    [doctorId, patientId]
  );
  return result.rows;
};

module.exports = {
  addMedicalRecord,
  getMedicalHistoryByPatient,
  getMedicalHistoryForDoctor,
};
