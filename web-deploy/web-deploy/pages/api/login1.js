// pages/api/login.js
import db from '../../database1';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Vulnerable SQL query (concatenating user input directly)
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (!row) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    res.status(200).json({ message: 'Login successful', user: row });
  });
}