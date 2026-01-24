// const db = require("../config/db");

// /**
//  * Get user by email
//  * @param {string} email
//  */
// const getUserByEmail = async (email) => {
//   const query = `
//     SELECT id, email, password, role, is_active
//     FROM users
//     WHERE email = ?
//     LIMIT 1
//   `;

//   const [rows] = await db.query(query, [email]);
//   return rows[0]; // undefined if not found
// };

// module.exports = {
//   getUserByEmail
// };






const db = require("../config/db");

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
  const query = `
    SELECT id, email, password, role, is_active
    FROM users
    WHERE email = ?
    LIMIT 1
  `;

  const [rows] = await db.query(query, [email]);
  return rows[0];
};

/**
 * Create new user
 */
const createUser = async (userData) => {
  const query = `
    INSERT INTO users (name, email, password, role, is_active)
    VALUES (?, ?, ?, ?, ?)
  `;

  const {name, email, password, role, is_active } = userData;

  const [result] = await db.query(query, [
    name,
    email,
    password,
    role,
    is_active
  ]);

  return result.insertId;
};

module.exports = {
  getUserByEmail,
  createUser
};
