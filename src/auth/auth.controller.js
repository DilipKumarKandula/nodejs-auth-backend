// src\auth\auth.controller.js

const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
} = require("./auth.service");


/**
 * Register user controller
 */
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const newUser = await registerUser(name, email, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

/**
 * Login user controller
 */
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const result = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user
      }
    });

  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const result = await refreshAccessToken(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: {
        accessToken: result.accessToken
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Logout controller
 */
const logoutController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await logoutUser(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerController,
  loginUserController,
  refreshTokenController,
  logoutController

};