const express = require('express');
const UrlController = require('../controllers/urlController');

const router = express.Router();
const urlController = new UrlController();

const setUrlRoutes = (app) => {
    app.post('/shorten', urlController.createShortUrl.bind(urlController));
    app.get('/:code', urlController.getOriginalUrl.bind(urlController));
    app.get('/api/urls', urlController.getAllUrls.bind(urlController));
    app.delete('/api/urls', urlController.deleteAllUrls.bind(urlController));
};

module.exports = setUrlRoutes;