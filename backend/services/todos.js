const todoRepository = require("../repositories/todos");

async function getTodos() {
    return await todoRepository.findAll();
}

async function createTodo(todoRequest) {
    const newTodo = await todoRepository.insert(todoRequest);
    return newTodo;
}

async function updateTodo(id, todoRequest) {
    const updatedTodo = await todoRepository.updateById(id, todoRequest);
    return updatedTodo;
}

async function deleteTodo(id) {
    await todoRepository.deleteById(id);
}

async function updateTodoStatus(id, newStatus) {
    const updatedTodo = await todoRepository.updateStatusById(id, newStatus);
    return updateTodo;
}

module.exports = {getTodos, createTodo, updateTodo, deleteTodo, updateTodoStatus};