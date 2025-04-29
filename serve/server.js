const express = require('express');
const app = express();
// GET semua user
app.get('/', (req, res) => {
    res.send('List all users');
});
//POST tambah user
app.post('/users', (req, res) => {
    res.send('User created');
});
//PUT update user
app.put('/users/:id', (req, res) => {
    res.send(`User with id ${req.params.id} updated`);
});
//DELETE hapus user
app.delete('/users/:id', (req, res) => {
    res.send(`User with id ${req.params.id} deleted`);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});