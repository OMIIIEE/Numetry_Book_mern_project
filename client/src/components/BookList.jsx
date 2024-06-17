import React, { useState,useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from 'axios'

const BookList = ({ books, wishlist, onToggleWishlist,user }) => {
  // const [localWishlist, setLocalWishlist] = useState(wishlist);
  
  const [copiesBought, setCopiesBought] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const storedCopies = localStorage.getItem("copiesBought");
    if (storedCopies) {
      setCopiesBought(JSON.parse(storedCopies));
    }
  }, []);

  

  useEffect(() => {
    localStorage.setItem("copiesBought", JSON.stringify(copiesBought));
  }, [copiesBought]);

  const toggleWishlist = (bookId) => {
    onToggleWishlist(bookId);
  };

  // const buyBook = (bookId) => {
  //   // Simulate the buying process
    // alert(`Book "${books.find(book => book._id === bookId).name}" has been purchased successfully!`);
    // setCopiesBought({
    //   ...copiesBought,
    //   [bookId]: (copiesBought[bookId] || 0) + 1
    // });
  // };

  const buyBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:9003/api/purchases', {
        userId: user._id,
        bookId,
        quantity: 1 // Assuming user buys one copy at a time
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Book "${books.find(book => book._id === bookId).name}" has been purchased successfully!`);
      setCopiesBought({
        ...copiesBought,
        [bookId]: (copiesBought[bookId] || 0) + 1
      });
      // Update the local state or trigger a re-fetch of book data
      // Depending on your application logic
    } catch (error) {
      console.error('Error purchasing book:', error);
      // Handle error
    }
  };
  // Ensure book is always an array
  if (!Array.isArray(books)) {
    books = [];
  }

  const openBookDetails = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {books.map((book) => (
        <Card
          key={book._id}
          className="border-none shadow-lg h-auto w-auto flex flex-col items-center py-4"
        >
          <div className="relative">
            <img
              src={book.imageLink || "https://via.placeholder.com/150"}
              alt={book.name}
              className="h-[36vh] object-cover rounded-t-md"
            />
            <button
              className="absolute top-[-10px] right-[-10px] z-10"
              onClick={() => toggleWishlist(book._id)}
            >
              <FaHeart
                className={`text-2xl ${
                  wishlist.includes(book._id)
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              />
            </button>
          </div>

          <CardBody className="px-2">
            <div className="flex items-center flex-col gap-1 justify-between">
              <div className="flex items-center flex-col gap-2">
                <h3 className="mt-4  text-2xl font-semibold text-center">
                  <Link
                    to={`#`}
                    className="text-[#00224D] hover:text-[#029D9D] no-underline "
                  >
                    {book.name}
                  </Link>
                </h3>
                <span className="flex items-center gap-1 font-medium text-[#00224D] text-sm">
                  <span>by {book.author}</span>
                </span>
                <span className="flex items-center text-[#00224D] font-medium text-sm">
                  Published by {book.publisher}
                </span>
                <span className="flex items-center  text-[#00224D]  text-sm">
                  <pre className="font-semibold">Copies : </pre> {book.copies - (copiesBought[book._id] || 0)}
                </span>
                <span className="flex items-center  text-[#00224D]  text-sm">
                  <pre className="font-semibold">Price : </pre> Rs {book.price}
                </span>

                <div className="flex items-center justify-between  text-gray-600">
                  <h5 className="text-md font-semibold">
                    Published Date :{" "}
                    {new Date(book.publishDate).toDateString()}
                  </h5>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 gap-20 bottom-0">
                <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"  onClick={() => buyBook(book._id)}>
                  Buy
                </button>
                <button className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600" onClick={() => openBookDetails(book)}>
                  View More
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
       {selectedBook && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-1/3">
            <h2 className="text-2xl font-semibold mb-2">{selectedBook.name}</h2>
            <p>Author: {selectedBook.author}</p>
            <p>Publisher: {selectedBook.publisher}</p>
            <p>Copies Available: {selectedBook.copies - (copiesBought[selectedBook._id] || 0)}</p>
            <p>Price: Rs {selectedBook.price}</p>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 mt-4" onClick={closeBookDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;