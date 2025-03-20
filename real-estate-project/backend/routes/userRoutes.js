const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/api/user', isAuthenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;