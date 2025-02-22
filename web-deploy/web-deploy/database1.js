// database.js
const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database (or open it if it already exists)
const db = new sqlite3.Database(':memory:'); // Use in-memory database for simplicity

// Create a users table and insert some sample data
db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    INSERT INTO users (username, password)
    VALUES ('admin', 'admin123'), ('user', 'user123')
  `);
});

module.exports = db;