const express = require('express');

const Todos = require("./todo.js")

const app = express();

app.use(express.json());

const todos = new Todos();

const port = process.env.PORT || 3000

app.get("/get_todo", (req, res) => {
    try {
        res.send(todos.getTodos())
    } catch (err) {
        res.status(404).send("Page Not Found");
    }
})

app.post("/add_todo", (req, res) => {
    try {
        const data = req.body
        res.send(todos.addTodos(data));
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
})

app.delete('/delete_todo/:id', (req, res) => {
    try {
        const { id } = req.params
        res.status(200).send(todos.deleteTodo(id));
    } catch (err) {
        res.status(404).send("ID Not Found");
    }
})


app.put("/update_todo", (req, res) => {
    try {
        const { todo } = req.body
        res.send(todos.putTodo(todo));
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})