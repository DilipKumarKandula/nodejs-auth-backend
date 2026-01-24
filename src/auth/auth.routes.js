const express = require("express");
const router = express.Router();

const { registerController } = require("./auth.controller");

// POST /auth/register
router.post("/register", registerController);

module.exports = router;
