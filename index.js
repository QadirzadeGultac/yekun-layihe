const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database'); // database.js faylından connection obyektini tələb edir

const app = express(); // Express tətbiqini yaradın
const port = 3000;

const cors = require('cors');
app.use(cors());

// Statik fayllar üçün public qovluğunu xidmət et
app.use(express.static('public'));

// JSON və form məlumatlarını emal etmək üçün middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Qeydiyyat API-si
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  console.log('Received data:', { name, email, password }); // Göndərilən məlumatları yoxlayın

  // Əvvəlcə e-mail-in mövcud olub-olmadığını yoxlayırıq
  const checkQuery = 'SELECT * FROM UsersNew WHERE Email = ?';

  connection.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err.message);
      res.status(500).send('Error checking email: ' + err.message);
      return;
    }

    if (results.length > 0) {
      // Əgər e-mail mövcuddursa, istifadəçiyə xəbərdarlıq göndəririk
      res.status(400).send('E-mail already exists. Please use another one.');
    } else {
      // Əgər e-mail mövcud deyilsə, məlumatı əlavə edirik
      const insertQuery = 'INSERT INTO UsersNew (Name, Email, Password) VALUES (?, ?, ?)';

      connection.query(insertQuery, [name, email, password], (err, results) => {
        if (err) {
          console.error('Error inserting data:', err.message);
          res.status(500).send('Error inserting data: ' + err.message);
          return;
        }

        console.log('Inserted data:', results);
        res.status(200).send('Registration successful!');
      });
    }
  });
});

// Giriş API-si
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  console.log('Received data:', { email, password }); // Göndərilən məlumatları yoxlayın

  // Verilənlər bazasında istifadəçinin olub-olmadığını yoxlayırıq
  const query = 'SELECT * FROM UsersNew WHERE Email = ? AND Password = ?';

  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.message);
      res.status(500).send('Error querying the database: ' + err.message);
      return;
    }

    if (results.length > 0) {
      // İstifadəçi mövcuddursa, giriş müvəffəqiyyətli sayılır
      res.status(200).send('Login successful!');
    } else {
      // İstifadəçi tapılmadıqda xəta mesajı göndəririk
      res.status(400).send('Invalid email or password');
    }
  });
});

// Serveri işə sal
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});