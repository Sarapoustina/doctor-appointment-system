const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');
const { createPatient } = require('../models/Patient');
const { createDoctor } = require('../models/Doctor');
const { createNurse } = require('../models/Nurse');

const register = async (req, res) => {
  const { name, email, password, role, age, gender, specialization } = req.body;

  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashed, role);

    if (role === 'patient') {
      await createPatient(user.id, age, gender);
    } else if (role === 'doctor') {
      await createDoctor(user.id, specialization);
    } else if (role === 'nurse') {
      await createNurse(user.id);
    }

    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
