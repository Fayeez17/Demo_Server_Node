const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./localForm.db", (error) => {
  if (error) {
    console.error("Database connection failed:", error.message);
    return;
  }

  console.log("Connected to local SQLite database");
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    gender TEXT NOT NULL,
    country TEXT NOT NULL,
    dateOfBirth TEXT NOT NULL,
    hobbies TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )
`);

module.exports = db;