const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true, enum: ['General', 'Bug Report', 'Feature Request', 'Support', 'Other'] },
    rating: { type: Number, required: true, min: 1, max: 5 },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

class FeedbackModel {
    async saveFeedback(feedbackData) {
        const feedback = new Feedback(feedbackData);
        return await feedback.save();
    }

    async getAllFeedback() {
        return await Feedback.find().sort({ createdAt: -1 });
    }

    async getFeedbackById(id) {
        return await Feedback.findById(id);
    }

    async deleteFeedback(id) {
        return await Feedback.findByIdAndDelete(id);
    }

    async getFeedbackStats() {
        const feedback = await this.getAllFeedback();
        const stats = {
            total: feedback.length,
            averageRating: feedback.length > 0 ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length : 0,
            categoryBreakdown: {}
        };

        feedback.forEach(f => {
            stats.categoryBreakdown[f.category] = (stats.categoryBreakdown[f.category] || 0) + 1;
        });

        return stats;
    }
}

module.exports = FeedbackModel;