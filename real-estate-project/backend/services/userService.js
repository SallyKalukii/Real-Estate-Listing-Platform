const pool = require('../config/db');

/**
 * Find a user by Google ID
 */
const findByGoogleId = async (googleId) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE google_id = $1',
        [googleId]
    );
    return result.rows[0] || null;
};

/**
 * Create a new user
 */
const createUser = async (googleId, email, name) => {
    const result = await pool.query(
        'INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) RETURNING *',
        [googleId, email, name]
    );
    return result.rows[0];
};

/**
 * Find or create a user
 */
const findOrCreateUser = async (googleId, email, name) => {
    let user = await findByGoogleId(googleId);
    if (!user) {
        user = await createUser(googleId, email, name);
    }
    return user;
};

module.exports = {
    findByGoogleId,
    createUser,
    findOrCreateUser,
};
