const db = require('./db');

const createNurse = async (userId) => {
  const result = await db.query(
    'INSERT INTO nurses (user_id) VALUES ($1) RETURNING *',
    [userId]
  );
  return result.rows[0];
};

const getNurseByUserId = async (userId) => {
  const result = await db.query('SELECT * FROM nurses WHERE user_id = $1', [userId]);
  return result.rows[0];
};

module.exports = { createNurse, getNurseByUserId };
