const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// In-memory user storage
const users = [];

// Secret key for JWT
const secretKey = 'c39bXq8K#5eG%tA@9F7^dN1*pm$Rj!2v';
const kid = 'MDNGMjU2M0U3RERFQUEwOUUzQUMwQ0NBN0Y1RUY0OEIxNTRDM0IxMw';

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  // Create a new user object and add to the in-memory storage
  const newUser = { username, password };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Verify endpoint
app.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the JWT token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { username } = decoded;
    res.status(200).json({ username });
  });
});

// Express route handler for greeting
app.get('/greeting', (req, res) => {
  res.json({ message: 'Welcome to the Auth service!' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const jtiAccess = uuidv4(); // Generate a dynamic JTI for access token
  const jtiRefresh = uuidv4(); // Generate a dynamic JTI for refresh token

  res.status(200).json({
    access_token: {
      aud: 'http://api.callahan-marketplace.com',
      iss: 'https://krakend.io',
      sub: user.username,
      jti: jtiAccess, // Use dynamic JTI for access token
      roles: ['user'],
      exp: 1735689600,
    },
    refresh_token: {
      aud: 'http://api.callahan-marketplace.com',
      iss: 'https://krakend.io',
      sub: user.username,
      jti: jtiRefresh, // Use dynamic JTI for refresh token
      exp: 1735689600,
    },
    exp: 1735689600,
  });
});


// Start the server
app.listen(3000, () => {
  console.log('Identity server running on port 3000');
});
