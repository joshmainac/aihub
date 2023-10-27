// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data
let tasks = [
    { id: 1, name: "Buy groceries" },
    { id: 2, name: "Clean the house" }
];

// Routes
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

app.post('/tasks', (req, res) => {
    console.log(req.body);
    const task = {
        id: tasks.length + 1,
        name: req.body.name
    };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    task.name = req.body.name;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
