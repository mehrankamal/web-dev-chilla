const express = require("express")
const todoService = require('../services/todos');

const todoController = express.Router();

todoController.get('/', async (req, res) => {
    const todos = await todoService.getTodos()
    res.json(todos);
});

todoController.post('/', async (req, res) => {
    const newTodo = await todoService.createTodo(req.body);
    res.json(newTodo);
});

todoController.put('/:id', async (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = await todoService.updateTodo(todoId, req.body);

    res.json(updatedTodo);
});

todoController.delete('/:id', async (req, res) => {
    const todoId = req.params.id;
    await todoService.deleteTodo(todoId);
    res.json({success: true});
});

todoController.put('/:id/status', async (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = await todoService.updateTodoStatus(todoId, req.body['done']);
    res.json(updatedTodo);
})

module.exports = todoController;