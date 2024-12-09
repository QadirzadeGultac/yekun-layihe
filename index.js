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

// API endpoint
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  console.log('Received data:', { name, email, password }); // Göndərilən məlumatları yoxlayın

  const query = 'INSERT INTO UsersNew (Name, Email, Password) VALUES (?, ?, ?)';
  
  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.message); // Xətanın dəqiq mesajı
      res.status(500).send('Error inserting data: ' + err.message);
      return;
    }
    console.log('Inserted data:', results);  // Məlumatların uğurla daxil olmasını yoxlayın
    res.status(200).send('Registration successful!');
  });
  
});



// Serveri işə sal
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


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
