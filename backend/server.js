require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// In-memory user storage (in production, use a database)
let users = [];

// Helper function to find user by email
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Helper function to add new user
const addUser = (email, password) => {
  if (findUserByEmail(email)) {
    return false; // User already exists
  }
  users.push({ email, password });
  return true;
};

app.use(cors());
app.use(bodyParser.json());

// Root route for health checks and quick sanity response
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'JWT Auth API', routes: ['/register', '/login', '/protected'] });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const userAdded = addUser(email, password);
  if (!userAdded) {
    return res.status(409).json({ error: 'User already exists' });
  }

  res.json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is protected data!', user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});