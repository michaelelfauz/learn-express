const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes')  // mengimpor folder dari folder routes

app.use(express.json()); // middleware untuk parsing json
app.use('/users', userRoutes);

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});