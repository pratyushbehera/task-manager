const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001; // Choose a port for your API

app.use(cors());
app.use(bodyParser.json());

let tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);
  res.json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );

  res.json(tasks.find(task => task.id === taskId));
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
