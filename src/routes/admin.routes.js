const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

router.get(
  "/admin/dashboard",
  authenticateToken,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.status(200).json({
      message: "Admin dashboard accessed",
      user: req.user
    });
  }
);

module.exports = router;
