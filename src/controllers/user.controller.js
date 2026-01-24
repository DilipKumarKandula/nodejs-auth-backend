const { getUserByEmail } = require("../models/user.model");

/**
 * Get user by email (for testing DB flow)
 */
const getUserByEmailController = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email query parameter is required"
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: user
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = {
  getUserByEmailController
};
