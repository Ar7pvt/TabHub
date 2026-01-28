const express = require('express');
const InvoiceController = require('../controllers/invoiceController');

const router = express.Router();
const invoiceController = new InvoiceController();

const setInvoiceRoutes = (app) => {
    app.post('/api/invoices', invoiceController.createInvoice.bind(invoiceController));
    app.get('/api/invoices', invoiceController.getAllInvoices.bind(invoiceController));
    app.get('/api/invoices/:invoiceNumber', invoiceController.getInvoice.bind(invoiceController));
    app.delete('/api/invoices/:invoiceNumber', invoiceController.deleteInvoice.bind(invoiceController));
};

module.exports = setInvoiceRoutes;