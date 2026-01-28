const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortCode: String
});

const Url = mongoose.model('Url', urlSchema);

class UrlModel {
    async saveUrl(shortCode, originalUrl) {
        const url = new Url({ originalUrl, shortCode });
        return await url.save();
    }

    async findUrl(shortCode) {
        const url = await Url.findOne({ shortCode });
        return url ? url.originalUrl : null;
    }

    async getAllUrls() {
        return await Url.find({}).sort({ _id: -1 });
    }

    async deleteAllUrls() {
        return await Url.deleteMany({});
    }
}

module.exports = UrlModel;