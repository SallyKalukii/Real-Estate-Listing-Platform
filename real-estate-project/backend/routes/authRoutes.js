const express = require('express');
const passport = require('passport');
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

module.exports = router;
