const pool = require('../config/db');

const User = {
    // Find a user by Google ID
    findByGoogleId: async (googleId) => {
        const query = 'SELECT * FROM users WHERE google_id = $1';
        const values = [googleId];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // Create a new user
    create: async (googleId, email, name) => {
        const query = `
            INSERT INTO users (google_id, email, name)
            VALUES ($1, $2, $3)
            RETURNING *`;
        const values = [googleId, email, name];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // Find a user by ID
    findById: async (id) => {
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },
};

module.exports = User;