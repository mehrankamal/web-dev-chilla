const dbConnectionPool = require("../config/db");

async function findAll() {
    const queryResults = await dbConnectionPool.query("SELECT * FROM todos;");
    return queryResults.rows;
}

async function insert(todoItem) {
    const queryResults = await dbConnectionPool.query("INSERT INTO todos(title, due_date, description) VALUES($1, $2, $3) RETURNING *",
        [todoItem.title, new Date(todoItem.due_date), todoItem.description]);
    return queryResults.rows[0];
}

async function updateById(id, newTodo) {
    const queryResults = await dbConnectionPool.query("UPDATE todos SET title = $1, description = $2, due_date = $3 WHERE id = $4 RETURNING *",
        [newTodo.title, newTodo.description, new Date(newTodo.due_date), id]);
    return queryResults.rows[0];
}

async function updateStatusById(id, newStatus) {
    const queryResults = await dbConnectionPool.query("UPDATE todos SET done = $1 WHERE id = $2 RETURNING *",
    [newStatus, id]);
    return queryResults.rows[0];
}

async function deleteById(id) {
    const queryResults = await dbConnectionPool.query("DELETE FROM todos WHERE id = $1", [id])
}

module.exports = {findAll, insert, updateById, updateStatusById, deleteById};