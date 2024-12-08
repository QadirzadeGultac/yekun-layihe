const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database');
const cors = require('cors');
const app = express();
const port = 3000;
//sign up
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received data:', { name, email, password });
  const query = 'INSERT INTO UsersNew (Name, Email, Password) VALUES (?, ?, ?)';
  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data: ' + err.message);
      return;
    }
    res.status(200).send('Registration successful!');
  });
});

//sign in
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM UsersNew WHERE Email = ? AND Password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying data: ' + err.stack);
      res.status(500).send('An error occurred while signing in.');
      return;
    }
    if (results.length > 0) {
      res.status(200).send('Sign-in successful!');
    } else {
      res.status(401).send('Invalid email or password.');
    }
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});