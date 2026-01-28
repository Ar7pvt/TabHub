const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    dueDate: { type: Date },
    assignedTo: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
taskSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const Task = mongoose.model('Task', taskSchema);

class TaskModel {
    async createTask(taskData) {
        const task = new Task(taskData);
        return await task.save();
    }

    async getAllTasks() {
        return await Task.find().sort({ createdAt: -1 });
    }

    async getTaskById(id) {
        return await Task.findById(id);
    }

    async updateTask(id, updateData) {
        updateData.updatedAt = new Date();
        return await Task.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }

    async getTaskStats() {
        const tasks = await this.getAllTasks();
        const stats = {
            total: tasks.length,
            completed: tasks.filter(t => t.completed).length,
            inProgress: tasks.filter(t => t.status === 'in-progress').length,
            todo: tasks.filter(t => t.status === 'todo').length,
            highPriority: tasks.filter(t => t.priority === 'high').length,
            overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length
        };
        return stats;
    }

    async getTasksByStatus(status) {
        return await Task.find({ status }).sort({ createdAt: -1 });
    }

    async getTasksByPriority(priority) {
        return await Task.find({ priority }).sort({ createdAt: -1 });
    }
}

module.exports = TaskModel;