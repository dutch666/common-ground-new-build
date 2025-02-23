// Placeholder for routes
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/index');
const authenticateToken = require('../middleware/authenticateToken');

// User registration route
router.post('/signup', registerUser);

// User login route
router.post('/login', loginUser);

// User profile route (protected)
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
