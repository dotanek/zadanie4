const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Constraints, would usually be secret but meh.

const PORT = 9000;
const DB_STRING = 'mongodb+srv://aji-zadanie4:1234567890@cluster-todo.fkkaz.mongodb.net/aji-zadanie4';

// Middleware.

app.use(express.json());

// Import routes.

const productsRoute = require('./routes/products');
const categoriesRoute = require('./routes/categories');
const ordersRoute = require('./routes/orders');
const statusesRoute = require('./routes/statuses');

// Routes middleware.

app.use('/api/products', productsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/statuses', statusesRoute);

mongoose.connect(DB_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to the database.');
    });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
