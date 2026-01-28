const InvoiceModel = require('../models/invoiceModel');

class InvoiceController {
    constructor() {
        this.invoiceModel = new InvoiceModel();
    }

    async createInvoice(req, res) {
        try {
            const invoiceData = req.body;
            // Calculate totals
            let subtotal = 0;
            invoiceData.items.forEach(item => {
                item.total = item.quantity * item.price;
                subtotal += item.total;
            });
            invoiceData.subtotal = subtotal;
            invoiceData.tax = subtotal * (invoiceData.taxRate / 100);
            invoiceData.total = subtotal + invoiceData.tax;

            const savedInvoice = await this.invoiceModel.saveInvoice(invoiceData);
            res.status(201).json({
                message: 'Invoice created successfully',
                invoice: savedInvoice
            });
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ error: 'Invoice number already exists' });
            } else {
                res.status(500).json({ error: 'Error creating invoice' });
            }
        }
    }

    async getInvoice(req, res) {
        try {
            const { invoiceNumber } = req.params;
            const invoice = await this.invoiceModel.findInvoice(invoiceNumber);
            if (invoice) {
                res.json(invoice);
            } else {
                res.status(404).json({ error: 'Invoice not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving invoice' });
        }
    }

    async getAllInvoices(req, res) {
        try {
            const invoices = await this.invoiceModel.getAllInvoices();
            res.json(invoices);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving invoices' });
        }
    }

    async deleteInvoice(req, res) {
        try {
            const { invoiceNumber } = req.params;
            const deletedInvoice = await this.invoiceModel.deleteInvoice(invoiceNumber);
            if (deletedInvoice) {
                res.json({ message: 'Invoice deleted successfully' });
            } else {
                res.status(404).json({ error: 'Invoice not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting invoice' });
        }
    }
}

module.exports = InvoiceController;