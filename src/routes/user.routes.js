const express = require("express");
const router = express.Router();

const {
  getUserByEmailController
} = require("../controllers/user.controller");

// GET /users/by-email?email=test@example.com
router.get("/by-email", getUserByEmailController);

module.exports = router;
