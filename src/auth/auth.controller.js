const { registerUser, loginUser } = require("./auth.service");

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
        token: result.token,
        user: result.user
      }
    });

  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

module.exports = {
  registerController,
  loginUserController
};