const db = require('./db');

const createDoctor = async (userId, specialization) => {
  const result = await db.query(
    'INSERT INTO doctors (user_id, specialization) VALUES ($1, $2) RETURNING *',
    [userId, specialization]
  );
  return result.rows[0];
};

const getDoctorByUserId = async (userId) => {
  const result = await db.query(`SELECT * FROM doctors WHERE user_id = $1`, [userId]);
  return result.rows[0];
};

module.exports = { createDoctor, getDoctorByUserId };
