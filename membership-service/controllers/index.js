const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration controller
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert user into the database
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );
    const userId = result.rows[0].id;

    // Create a wallet for the user
    await pool.query('INSERT INTO wallets (user_id, balance) VALUES ($1, $2)', [userId, 0]);

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// User login controller
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in' });
  }
};

// User profile controller
const getUserProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Retrieve user profile and wallet details
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const walletResult = await pool.query('SELECT * FROM wallets WHERE user_id = $1', [userId]);

    const userProfile = userResult.rows[0];
    const walletDetails = walletResult.rows[0];

    res.status(200).json({ userProfile, walletDetails });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
