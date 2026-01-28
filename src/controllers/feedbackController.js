const FeedbackModel = require('../models/feedbackModel');

class FeedbackController {
    constructor() {
        this.feedbackModel = new FeedbackModel();
    }

    async createFeedback(req, res) {
        try {
            const feedbackData = req.body;
            const savedFeedback = await this.feedbackModel.saveFeedback(feedbackData);
            res.status(201).json({
                message: 'Feedback submitted successfully',
                feedback: savedFeedback
            });
        } catch (error) {
            res.status(500).json({ error: 'Error saving feedback' });
        }
    }

    async getAllFeedback(req, res) {
        try {
            const feedback = await this.feedbackModel.getAllFeedback();
            res.json(feedback);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving feedback' });
        }
    }

    async getFeedback(req, res) {
        try {
            const { id } = req.params;
            const feedback = await this.feedbackModel.getFeedbackById(id);
            if (feedback) {
                res.json(feedback);
            } else {
                res.status(404).json({ error: 'Feedback not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving feedback' });
        }
    }

    async deleteFeedback(req, res) {
        try {
            const { id } = req.params;
            const deletedFeedback = await this.feedbackModel.deleteFeedback(id);
            if (deletedFeedback) {
                res.json({ message: 'Feedback deleted successfully' });
            } else {
                res.status(404).json({ error: 'Feedback not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting feedback' });
        }
    }

    async getFeedbackStats(req, res) {
        try {
            const stats = await this.feedbackModel.getFeedbackStats();
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving feedback statistics' });
        }
    }
}

module.exports = FeedbackController;