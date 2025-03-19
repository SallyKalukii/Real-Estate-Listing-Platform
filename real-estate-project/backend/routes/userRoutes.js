const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/profile', isAuthenticated, (req, res) => {
  res.send('Welcome to your profile page');
});

module.exports = router;