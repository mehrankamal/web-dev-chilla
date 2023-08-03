require('dotenv').config();

const express = require('express');
const todoController = require('./controllers/todos');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/todos', todoController)

app.listen(port, () => {
    console.log("Application started on port", port);
});