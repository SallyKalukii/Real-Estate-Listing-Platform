const express = require('express');
const passport = require('passport');
const pool = require('../config/db');  
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const dns = require('dns');
const validator = require('validator');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  (req, res) => {
    console.log("User is logged in:", req.user);
    res.redirect('/');
  }
);

//manual registration
router.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;

  // Basic email format validation
  if (!validator.isEmail(email)) {
      return res.status(400).send('Invalid email format');
  }

  // Domain validation
  const domain = email.split('@')[1];
  dns.resolveMx(domain, async (err, addresses) => {
      if (err || addresses.length === 0) {
          return res.status(400).send('Invalid email domain');
      }

      try {
          // Check if the user already exists
          const existingUser = await pool.query(
              'SELECT * FROM users WHERE email = $1',
              [email]
          );
          if (existingUser.rows.length > 0) {
              return res.status(400).send('User already exists');
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insert the new user into the database
          const newUser = await pool.query(
              'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
              [name, email, hashedPassword]
          );

          res.status(201).json(newUser.rows[0]); // Created status code
      } catch (err) {
          console.error('Registration error:', err);
          res.status(500).send('Server error');
      }
  });
});

// manual login
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try{
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if(result.rows.length ===0){
      return res.status(400).json({message: 'User does not exist'});
    }

    const user = user.rows[0];

    //comparing passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: 'Invalid credentials'});
    }

    req.login(user, (err) => {
      if(err) return res.status(500).json({message: 'Login failed'});
      return res.json(user);

      
      
    });
  } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({message : 'Server error'});
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








module.exports = router;
