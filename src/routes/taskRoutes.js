const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();
const taskController = new TaskController();

const setTaskRoutes = (app) => {
    app.post('/api/tasks', taskController.createTask.bind(taskController));
    app.get('/api/tasks', taskController.getAllTasks.bind(taskController));
    app.get('/api/tasks/:id', taskController.getTask.bind(taskController));
    app.put('/api/tasks/:id', taskController.updateTask.bind(taskController));
    app.delete('/api/tasks/:id', taskController.deleteTask.bind(taskController));
    app.get('/api/task-stats', taskController.getTaskStats.bind(taskController));
    app.get('/api/tasks/status/:status', taskController.getTasksByStatus.bind(taskController));
    app.get('/api/tasks/priority/:priority', taskController.getTasksByPriority.bind(taskController));
};

module.exports = setTaskRoutes;