// src/middleware/auth.middleware.js

const jwt = require("jsonwebtoken");

/**
 * JWT authentication middleware
 */
const authenticateToken = (req, res, next) => {
  // 1. Read Authorization header
  const authHeader = req.headers["authorization"];

  // Header format: "Bearer TOKEN"
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing"
    });
  }

  // 2. Extract token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing"
    });
  }

  // 3. Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token"
      });
    }

    // 4. Attach user info to request
    req.user = decoded;

    // 5. Allow request to continue
    next();
  });
};

module.exports = authenticateToken;
