// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
const bookRoutes =require('./routes/AddBook')
const wishlistRoutes = require('./routes/Wishlist');
const purchasesRoutes = require('./routes/purchases'); 

const cors = require('cors');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

 
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/books', bookRoutes);
app.use('/api/wishlist',wishlistRoutes);
app.use('/api/purchases', purchasesRoutes); 

connectDB().then(() => {
  const PORT = process.env.PORT || 9003;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
