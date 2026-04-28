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
  const error = new Error("Authorization header missing");
  error.statusCode = 401;
  return next(error);
}

  // 2. Extract token
  const token = authHeader.split(" ")[1];

if (!token) {
  const error = new Error("Token missing");
  error.statusCode = 401;
  return next(error);
}


  // 3. Verify token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    err.statusCode = 401;
    err.message = "Invalid or expired token";
    return next(err);
  }

  req.user = decoded;
  next();
});

};

module.exports = authenticateToken;
