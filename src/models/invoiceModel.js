const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    items: [{
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true }
    }],
    subtotal: { type: Number, required: true },
    taxRate: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

class InvoiceModel {
    async saveInvoice(invoiceData) {
        const invoice = new Invoice(invoiceData);
        return await invoice.save();
    }

    async findInvoice(invoiceNumber) {
        return await Invoice.findOne({ invoiceNumber });
    }

    async getAllInvoices() {
        return await Invoice.find().sort({ createdAt: -1 });
    }

    async deleteInvoice(invoiceNumber) {
        return await Invoice.findOneAndDelete({ invoiceNumber });
    }
}

module.exports = InvoiceModel;