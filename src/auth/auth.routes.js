const express = require("express");
const router = express.Router();

const { registerController, loginUserController  } = require("./auth.controller");
const authenticateToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");


// POST /auth/register
router.post("/register", registerController);
router.post("/login", loginUserController)

router.get(
  "/user/profile",
  authenticateToken,
  authorizeRoles("USER", "ADMIN"),
  (req, res) => {
    res.status(200).json({
      message: "User profile accessed",
      user: req.user
    });
  }
);


module.exports = router;
