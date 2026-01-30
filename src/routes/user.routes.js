const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// USER PROFILE (RBAC PROTECTED)
router.get(
  "/user/profile",
  authenticateToken,
  authorizeRoles("USER", "ADMIN"),
  (req, res) => {
  res.status(200).json({
    success: true,
    message: "User profile accessed",
    data: req.user
  });

  }
);

module.exports = router;
