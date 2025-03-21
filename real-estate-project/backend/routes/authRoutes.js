const express = require('express');
const passport = require('passport');
const pool = require('../config/db');  // ✅ Import your DB pool
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  (req, res) => {
    console.log("User is logged in:", req.user);
    res.redirect('/');
  }
);

router.get('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  
})

router.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Logout failed');
    }
    res.redirect('/');
  });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, password]
    );
    res.json({ email: newUser.rows[0].email });  // ✅ Must return JSON
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
});


// Login route (manual login with email/password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ email: result.rows[0].email });  // ✅ Respond with JSON
  } catch (err) {
    console.error('🔥 Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});


module.exports = router;
