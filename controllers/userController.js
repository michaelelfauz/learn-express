const connection = require('../db');

// read
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// create
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User created!');
    });
};

// update
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    // Simple validation
    if (!name || !email) {
      return res.status(400).send('Name and Email are required.');
    }
  
    connection.query(
      'UPDATE users SET name=?, email=? WHERE id=?',
      [name, email, id],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Database error.');
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).send('User not found.');
        }
  
        res.send('User updated!');
      }
    );
  };


// Delete 
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User deleted!');
    });
};