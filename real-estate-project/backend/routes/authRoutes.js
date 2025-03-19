const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  (req, res) => {
    console.log("User is logged in:", req.user);
    res.redirect('/');
  }
);

router.get('/login', (req, res) => {
  res.send('Please log in. <a href="/auth/google">Login with Google</a>');
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Logout failed');
    }
    res.redirect('/');
  });
});

module.exports = router;
