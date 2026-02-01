// src/auth/auth.service.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getUserByEmail, createUser } = require("../models/user.model");
const { saveRefreshToken } = require("../models/refreshToken.model");
const { findRefreshToken } = require("../models/refreshToken.model");
const { revokeRefreshToken } = require("../models/refreshToken.model");

/**
 * Register a new user
 */
const registerUser = async (name, email, password) => {
  // 1. Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 3. Prepare user data
  const userData = {
    name,
    email,
    password: hashedPassword,
    role: "USER",
    is_active: 1
  };

  // 4. Insert user into DB
  const userId = await createUser(userData);

  // 5. Return safe response
  return {
    id: userId,
    email,
    role: "USER"
  };
};

/**
 * Login existing user (ACCESS + REFRESH TOKENS)
 */
const loginUser = async (email, password) => {
  // 1. Find user by email
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // 3. Generate ACCESS token (short-lived)
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "2m" }
  );

  // 4. Generate REFRESH token (long-lived)
  const refreshToken = jwt.sign(
     {
    id: user.id,
    email: user.email,
    role: user.role
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // 5. Calculate refresh token expiry date (DB)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // 6. Store refresh token in DB
  await saveRefreshToken(user.id, refreshToken, expiresAt);

  
  // 7. Return both tokens
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
};

/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  // 1. Verify refresh token JWT
  let decoded;
  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }

  // 2. Check refresh token in DB
  const storedToken = await findRefreshToken(refreshToken);
  if (!storedToken) {
    throw new Error("Refresh token revoked or expired");
  }

  // 3. Generate NEW access token
  const newAccessToken = jwt.sign(
  {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role
  },
    process.env.JWT_SECRET,
    { expiresIn: "2m" }
  );

  return { accessToken: newAccessToken };
};


/**
 * Logout user (revoke refresh token)
 */
const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  await revokeRefreshToken(refreshToken);
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser

};
