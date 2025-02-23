const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// User registration endpoint
app.post('/signup', (req, res) => {
  // Placeholder for user registration logic
  res.status(201).send('User registered successfully');
});

// User login endpoint
app.post('/login', (req, res) => {
  // Placeholder for user login logic
  res.status(200).send('User logged in successfully');
});

// User profile endpoint
app.get('/profile', (req, res) => {
  // Placeholder for user profile retrieval logic
  res.status(200).send('User profile data');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
