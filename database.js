const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
// Verilənlər bazası bağlantısı qurulur
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // MySQL istifadəçi adı
  password: '1234', // MySQL şifrəniz
  database: 'yekun_layihe' // Verilənlər bazasının adı
});

// Bağlantını yoxla
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);

  // SQL faylını oxu
  const sqlFilePath = path.join(__dirname, 'Public', 'database.sql');
  const sql = fs.readFileSync(sqlFilePath, 'utf8');

  // SQL faylını icra et
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL file:', err);
      return;
    }
    console.log('Database initialized successfully!');
    connection.end(); // Bağlantını bağla
  });
});

module.exports = connection;
