import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (bookId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(bookId)) {
        return prevWishlist.filter(id => id !== bookId);
      } else {
        return [...prevWishlist, bookId];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
