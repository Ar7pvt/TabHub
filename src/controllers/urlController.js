const UrlModel = require('../models/urlModel');

class UrlController {
    constructor() {
        this.urlModel = new UrlModel();
    }

    async createShortUrl(req, res) {
        const { originalUrl } = req.body;
        const shortCode = this.generateShortCode(originalUrl);
        try {
            await this.urlModel.saveUrl(shortCode, originalUrl);
            res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
        } catch (error) {
            res.status(500).json({ error: 'Error saving URL' });
        }
    }

    async getOriginalUrl(req, res) {
        const { shortCode } = req.params;
        try {
            const originalUrl = await this.urlModel.findUrl(shortCode);
            if (originalUrl) {
                res.redirect(originalUrl);
            } else {
                res.status(404).json({ error: 'URL not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving URL' });
        }
    }

    async getAllUrls(req, res) {
        try {
            const urls = await this.urlModel.getAllUrls();
            res.json(urls);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving URLs' });
        }
    }

    async deleteAllUrls(req, res) {
        try {
            await this.urlModel.deleteAllUrls();
            res.json({ message: 'All URLs deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting URLs' });
        }
    }

    generateShortCode(url) {
        return Math.random().toString(36).substring(2, 8);
    }
}

module.exports = UrlController;