const TaskModel = require('../models/taskModel');

class TaskController {
    constructor() {
        this.taskModel = new TaskModel();
    }

    async createTask(req, res) {
        try {
            const taskData = req.body;
            const savedTask = await this.taskModel.createTask(taskData);
            res.status(201).json({
                message: 'Task created successfully',
                task: savedTask
            });
        } catch (error) {
            res.status(500).json({ error: 'Error creating task' });
        }
    }

    async getAllTasks(req, res) {
        try {
            const tasks = await this.taskModel.getAllTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving tasks' });
        }
    }

    async getTask(req, res) {
        try {
            const { id } = req.params;
            const task = await this.taskModel.getTaskById(id);
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving task' });
        }
    }

    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedTask = await this.taskModel.updateTask(id, updateData);
            if (updatedTask) {
                res.json({
                    message: 'Task updated successfully',
                    task: updatedTask
                });
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error updating task' });
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const deletedTask = await this.taskModel.deleteTask(id);
            if (deletedTask) {
                res.json({ message: 'Task deleted successfully' });
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting task' });
        }
    }

    async getTaskStats(req, res) {
        try {
            const stats = await this.taskModel.getTaskStats();
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving task statistics' });
        }
    }

    async getTasksByStatus(req, res) {
        try {
            const { status } = req.params;
            const tasks = await this.taskModel.getTasksByStatus(status);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving tasks by status' });
        }
    }

    async getTasksByPriority(req, res) {
        try {
            const { priority } = req.params;
            const tasks = await this.taskModel.getTasksByPriority(priority);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving tasks by priority' });
        }
    }
}

module.exports = TaskController;