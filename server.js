const express = require('express');
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017/urlshortener', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

startServer();