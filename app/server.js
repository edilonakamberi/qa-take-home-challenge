const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;

const CONTACTS = [
  {
    name: 'Anna Schmidt',
    email: 'anna.schmidt@nfon.com',
    phone: '+49 170 1234567',
    department: 'Engineering',
  },
  {
    name: 'Bob Example',
    email: 'bob@example.com',
    phone: '+1 555 0100',
    department: 'Sales',
  },
];

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sessions = new Set();

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please enter email and password',
    });
  }

  if (email === 'admin@cloudya.com' && password === 'Test1234!') {
    const token = `mock-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessions.add(token);
    return res.json({
      success: true,
      token,
      user: { email: 'admin@cloudya.com' },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials',
  });
});

app.post('/api/auth/logout', (req, res) => {
  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (m) sessions.delete(m[1]);
  res.json({ success: true });
});

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  const token = m && m[1];
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/api/contacts', requireAuth, (req, res) => {
  const q = (req.query.q || '').toString().trim().toLowerCase();
  if (!q) {
    return res.json(CONTACTS);
  }
  const filtered = CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q)
  );
  res.json(filtered);
});

const server = app.listen(PORT, () => {
  console.log(`Cloudya Lite at http://localhost:${PORT}`);
});
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Stop the other process (e.g. kill $(lsof -ti :${PORT})) or run: PORT=3001 npm start`
    );
    process.exit(1);
  }
  throw err;
});