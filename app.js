// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

// Create an Express application
const app = express();
// Use express.static middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());


// Connect to the SQLite database
const db = new sqlite3.Database('users.db');

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/login.html");
})

// Create a user table (if not exists)
db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)'
  );
  
  // Define routes for your API
  // User login
  app.post('api/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    // Check if the user exists in the database
    db.get(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
  
        if (!row) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        res.json({ message: 'Login successful' });
      }
    );
  });
  
  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
