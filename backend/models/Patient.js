const db = require('./db');

const createPatient = async (userId, age, gender) => {
  const result = await db.query(
    'INSERT INTO patients (user_id, age, gender) VALUES ($1, $2, $3) RETURNING *',
    [userId, age, gender]
  );
  return result.rows[0];
};

const getPatientByUserId = async (userId) => {
  const result = await db.query(`SELECT * FROM patients WHERE user_id = $1`, [userId]);
  return result.rows[0];
};

module.exports = { createPatient, getPatientByUserId };
