const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// In-memory user storage
const users = [];

// Secret key for JWT
const secretKey = 'c39bXq8K#5eG%tA@9F7^dN1*pm$Rj!2v';

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

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user with the provided username
  const user = users.find(user => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate and return a JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  res.status(200).json({ token });
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

// Start the server
app.listen(3000, () => {
  console.log('Identity server running on port 3000');
});
