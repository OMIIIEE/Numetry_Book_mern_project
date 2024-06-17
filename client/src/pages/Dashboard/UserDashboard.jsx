
import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowBooks from "../../components/ShowBooks";
import NavbarUser from "../../components/NavbarUser";
import Wishlist from "../Wishlist";

const UserDashboard = () => {
  const [wishlist, setWishlist] = useState([]);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:9003/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:9003/api/wishlist/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data.wishlist);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  // Update wishlist in backend
  const updateWishlist = async (newWishlist) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:9003/api/wishlist", { userId: user._id, books: newWishlist }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(newWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  // Toggle book in wishlist
  const handleToggleWishlist = (bookId) => {
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];
    updateWishlist(newWishlist);
  };

  // Remove book from wishlist
  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter((id) => id !== bookId);
    updateWishlist(updatedWishlist);
  };

  // Fetch books data
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:9003/api/auth/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data.books);
      } catch (error) {
        console.error("Error fetching Book data:", error);
      }
    };
    fetchBookData();
  }, []);

  const handleAddBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center">
      <NavbarUser wishlistCount={wishlist.length} onAddBookClick={handleAddBookClick}/>
      <div className="container flex flex-col items-center justify-center">
        <div className='text-3xl'>
          Welcome to User Dashboard
        </div>
      </div>
      <ShowBooks user={user} books={books} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />
      
      {showModal && <Wishlist books={books} wishlist={wishlist} onRemoveFromWishlist={removeFromWishlist} closeModal={handleCloseModal} className="-mt-4"/>}
      
    </div>
  );
};

export default UserDashboard;
