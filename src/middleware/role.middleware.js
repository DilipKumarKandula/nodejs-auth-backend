// src/middleware/role.middleware.js

/**
 * Role-based authorization middleware
 * @param {...string} allowedRoles
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by JWT middleware
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        message: "Access denied: role information missing"
      });
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }

    // Role allowed → continue
    next();
  };
};

module.exports = authorizeRoles;
