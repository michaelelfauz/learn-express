✅ SESI 1 – Bikin Server Express Pertamamu

Tujuan: Bikin server backend pakai Express.

Langkah-langkah:

    Install Node.js dulu ya.

    Buka terminal, masuk ke folder project, lalu ketik:

npm init -y

Install Express:

npm install express

Bikin file server.js, isi dengan:

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(5000, () => {
  console.log('Server jalan di http://localhost:5000');
});

Jalankan:

    node server.js

    Cek di browser: buka http://localhost:5000 ➔ harusnya muncul tulisan Hello, World!

✏️ SESI 2 – Latihan Routing di Express.js

Tujuan: Belajar cara pakai metode HTTP: GET, POST, PUT, DELETE.

Update isi server.js kamu:

// GET semua users
app.get('/users', (req, res) => {
  res.send('List semua users');
});

// POST tambah user
app.post('/users', (req, res) => {
  res.send('User berhasil ditambahkan');
});

// PUT update user
app.put('/users/:id', (req, res) => {
  res.send(`User dengan id ${req.params.id} berhasil diupdate`);
});

// DELETE hapus user
app.delete('/users/:id', (req, res) => {
  res.send(`User dengan id ${req.params.id} berhasil dihapus`);
});

👉 Tes pakai Postman atau cURL ke endpoint /users.
✏️ SESI 3 – Dasar-Dasar MySQL

Tujuan: Kenalan sama SQL dan database MySQL.

Langkah-langkah:

    Install MySQL (bisa pakai XAMPP juga).

    Buka MySQL Command Line / Workbench, lalu ketik:

    CREATE DATABASE belajar_db;
    USE belajar_db;

    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100)
    );

    INSERT INTO users (name, email) VALUES ('Budi', 'budi@gmail.com');
    SELECT * FROM users;

Pastikan datanya muncul saat kamu query SELECT * FROM users; ya!
✏️ SESI 4 – Connect Node.js ke MySQL

Tujuan: Hubungkan backend Express ke database MySQL.

    Install dulu package MySQL:

npm install mysql2

Bikin file db.js, isinya:

    const mysql = require('mysql2');

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // ganti sesuai password MySQL kamu
      database: 'belajar_db'
    });

    connection.connect((err) => {
      if (err) {
        console.error('Gagal konek ke database:', err);
        return;
      }
      console.log('Berhasil konek ke MySQL!');
    });

    module.exports = connection;

Cek server kamu jalan dan nggak ada error koneksi.
✏️ SESI 5 – Struktur Project Express yang Lebih Rapi

Tujuan: Rapihin struktur folder biar gampang dikembangkan.

Struktur folder:

/project
  /controllers
    userController.js
  /routes
    userRoutes.js
  db.js
  server.js

server.js

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/users', userRoutes);

app.listen(5000, () => {
  console.log('Server jalan di http://localhost:5000');
});

routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

controllers/userController.js

const connection = require('../db');

// Ambil semua user
exports.getAllUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Tambah user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  connection.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('User berhasil ditambahkan!');
    }
  );
};

// Update user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  connection.query(
    'UPDATE users SET name=?, email=? WHERE id=?',
    [name, email, id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('User berhasil diupdate!');
    }
  );
};

// Hapus user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM users WHERE id=?',
    [id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('User berhasil dihapus!');
    }
  );
};

✏️ SESI 6 – CRUD Lengkap: Uji Coba Pakai Postman

Tujuan: Pastikan semua fitur CRUD berfungsi.
Method	URL	Body (jika perlu)	Fungsi
GET	/users	-	Lihat semua users
POST	/users	{ "name": "Aldi", "email": "aldi@gmail.com" }	Tambah user
PUT	/users/1	{ "name": "Aldi Update", "email": "update@gmail.com" }	Update user id 1
DELETE	/users/1	-	Hapus user id 1

