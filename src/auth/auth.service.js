// // src/auth/auth.service.js
// const bcrypt = require("bcryptjs");
// const { getUserByEmail, createUser } = require("../models/user.model");


//  * Register a new user
//  * @param {string} name
//  * @param {string} email
//  * @param {string} password
 
// const registerUser = async (name, email, password) => {
//   // 1. Check if user already exists
//   const existingUser = await getUserByEmail(email);
//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   // 2. Hash password
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   // 3. Prepare user data
//   const userData = {
//     name,
//     email,
//     password: hashedPassword,
//     role: "USER",
//     is_active: 1
//   };

//   // (Optional debug – can remove later)
//   console.log("DEBUG userData:", userData);

//   // 4. Insert user into DB
//   const userId = await createUser(userData);

//   // 5. Return safe response
//   return {
//     id: userId,
//     email,
//     role: "USER"
//   };
// };


//  * Login existing user
//  * @param {string} email
//  * @param {string} password
 
// const loginUser = async (email, password) => {
//   // 1. Find user by email
//   const user = await getUserByEmail(email);

//   if (!user) {
//     throw new Error("Invalid email or password");
//   }

//   // 2. Compare passwords
//   const isPasswordMatch = await bcrypt.compare(
//     password,
//     user.password
//   );

//   if (!isPasswordMatch) {
//     throw new Error("Invalid email or password");
//   }

//   // 3. Login success (JWT comes later)
//   return {
//     id: user.id,
//     email: user.email,
//     role: user.role
//   };
// };

// module.exports = {
//   registerUser,
//   loginUser
// };









// src/auth/auth.service.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("../models/user.model");

/**
 * Register a new user
 * @param {string} name
 * @param {string} email
 * @param {string} password
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
 * Login existing user
 * @param {string} email
 * @param {string} password
 */
const loginUser = async (email, password) => {
  // 1. Find user by email
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Compare passwords
  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // 3. Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  // 4. Return token + user info
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
};

module.exports = {
  registerUser,
  loginUser
};
