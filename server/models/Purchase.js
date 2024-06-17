// models/Purchase.js

const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, required: true }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
