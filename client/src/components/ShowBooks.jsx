import React, { useState, useEffect } from "react";
import axios from "axios";
import BookList from "./BookList";
import Pagination from "./Pagination";

const ShowBooks = ({books ,wishlist, onToggleWishlist ,user}) => {
  // const [books, setBooks] = useState([]);

  const[currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8); 

  // useEffect(() => {
  //   const fetchBookData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await axios.get("http://localhost:9003/api/auth/books", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       console.log("Fetched books data:", res.data.books); // Log the fetched data
  //       setBooks(res.data.books);
  //     } catch (error) {
  //       console.error("Error fetching Book data:", error);
  //     }
  //   };
  //   fetchBookData();
  // }, []);


  // Calculate total pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="items-center text-center mt-4">
      Books Available
      {/* <BookList books={books}/> */}
      <div className="p-8">
      <BookList user={user} books={currentBooks}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}/>

        <Pagination  totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default ShowBooks;
