// 🛡️ authorizeRole.js
// Middleware to allow only specific roles (e.g., 'doctor', 'nurse', etc.)

const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    // Check if user role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }

    next(); // Move to route handler
  };
};

module.exports = authorizeRole;
