const express = require('express');
const FeedbackController = require('../controllers/feedbackController');

const router = express.Router();
const feedbackController = new FeedbackController();

const setFeedbackRoutes = (app) => {
    app.post('/api/feedback', feedbackController.createFeedback.bind(feedbackController));
    app.get('/api/feedback', feedbackController.getAllFeedback.bind(feedbackController));
    app.get('/api/feedback/:id', feedbackController.getFeedback.bind(feedbackController));
    app.delete('/api/feedback/:id', feedbackController.deleteFeedback.bind(feedbackController));
    app.get('/api/feedback-stats', feedbackController.getFeedbackStats.bind(feedbackController));
};

module.exports = setFeedbackRoutes;