const bcrypt = require("bcryptjs");
const { getUserByEmail, createUser } = require("../models/user.model");


/**
 * Register a new user
 * @param {string} email
 * @param {string} password
 */
const registerUser = async (name,email, password) => {
  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Return prepared user data (DB insert comes later)
// Prepare user data
const userData = {
  name,
  email,
  password: hashedPassword,
  role:"USER",
  is_active: 1
};

console.log("DEBUG userData:", userData);

// Insert user into DB
const userId = await createUser(userData);

return {
  id: userId,
  email,
  role: "USER"
};

};

module.exports = {
  registerUser
};
