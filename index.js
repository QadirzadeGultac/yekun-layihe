const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./database');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.static('Public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const checkQuery = 'SELECT * FROM UsersNew WHERE Email = ?';
  connection.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.message);
      return res.status(500).send('Error querying the database');
    }

    if (results.length > 0) {
      return res.status(400).send('E-mail already exists!');
    } else {
      const insertQuery = 'INSERT INTO UsersNew (Name, Email, Password) VALUES (?, ?, ?)';
      connection.query(insertQuery, [name, email, password], (err, results) => {
        if (err) {
          console.error('Error inserting data:', err.message);
          return res.status(500).send('Error inserting data');
        }
        console.log('User registered:', results);
        res.status(200).send('Registration successful!');
      });
    }
  });
});
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT Name FROM UsersNew WHERE Email = ? AND Password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.message);
      return res.status(500).send('Error querying the database');
    }
    if (results.length > 0) {
      const userName = results[0].Name;
      return res.status(200).json({ message: 'Login successful!', name: userName });
    } else {
      return res.status(400).send('Invalid email or password');
    }
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
