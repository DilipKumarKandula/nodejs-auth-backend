const db = require("../config/db");

/**
 * Save refresh token
 */
const saveRefreshToken = async (userId, refreshToken, expiresAt) => {
  const query = `
    INSERT INTO refresh_tokens (user_id, refresh_token, expires_at)
    VALUES (?, ?, ?)
  `;
  await db.query(query, [userId, refreshToken, expiresAt]);
};

/**
 * Find valid refresh token
 */
const findRefreshToken = async (token) => {
  const query = `
    SELECT * FROM refresh_tokens
    WHERE refresh_token = ?
      AND is_revoked = 0
      AND expires_at > NOW()
    LIMIT 1
  `;
  const [rows] = await db.query(query, [token]);
  return rows[0];
};


/**
 * Revoke refresh token
 */
const revokeRefreshToken = async (token) => {
  const query = `
    UPDATE refresh_tokens
    SET is_revoked = 1
    WHERE refresh_token = ?
  `;
  await db.query(query, [token]);
};



module.exports = {
  saveRefreshToken,
  findRefreshToken
};
