// routes/wishlist.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Get wishlist for a user
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.json({ wishlist: wishlist ? wishlist.books : [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update wishlist for a user
router.post('/', async (req, res) => {
  const { userId, books } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.books = books;
    } else {
      wishlist = new Wishlist({ userId, books });
    }
    await wishlist.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
