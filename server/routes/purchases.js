// routes/purchases.js

const express = require('express');
const Purchase = require('../models/Purchase');
const router = express.Router();
const Book = require('../models/Book')


// Route to handle book purchases
router.post('/', async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.copies < quantity) {
      return res.status(400).json({ message: 'Not enough copies available' });
    }

    book.copies -= quantity;
    await book.save();
    
    // Create a new purchase record
    const purchase = new Purchase({
      userId,
      bookId,
      quantity,
      purchaseDate: new Date()
    });

    // Save the purchase record to the database
    await purchase.save();

    res.status(201).json({ message: 'Purchase recorded successfully' });
  } catch (error) {
    console.error('Error recording purchase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
