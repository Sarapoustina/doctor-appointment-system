// 🔐 authMiddleware.js
// Verifies JWT token and attaches decoded user info to req.user

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if the token exists and follows 'Bearer <token>' format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (id, role) to request
    req.user = decoded;

    next(); // Move to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;
