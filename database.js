const mysql = require('mysql2'); // MySQL modulunu tələb edin

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // Öz şifrənizi burada yazın
  database: 'yekun_layihe' // Verilənlər bazasının adı
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection; // Export edin ki, digər fayllar istifadə edə bilsin