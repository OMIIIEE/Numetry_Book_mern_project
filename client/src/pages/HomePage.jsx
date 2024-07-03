// src/pages/HomePage.jsx
import React, { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import logo from '../assets/logo3.png';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import EnquiryForm from './EnquiryForm';
import BooksSection from './BooksSection';
import FeedbackCarousel from './FeedbackCarousel';
import PopularBooks from './PopularBooks.';
import AuthorsCarousel from '../components/AuthorsCarousel';
import backgroundImage from '../assets/bg.png'
// import PopularBooksCarousel from '../components/PopularBooksCarousel';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [showPopularBooks, setShowPopularBooks] = useState(true);
  const enquiryFormRef = useRef(null);

  const popularBooks = [
    { id: 1, title: 'Three Men In A Boat', image: 'https://1.bp.blogspot.com/-KxpQoi_yiJ0/XV0QxUHutBI/AAAAAAAA-6E/2ydtJ9a0cZQ0dT1T1WjUi67cOIwrME04wCLcBGAs/s1600/19537D2F-9429-4000-A26B-644EC9EB4E0C.jpeg' },
    // { id: 2, title: 'Harry Potter and the Deathly Hallows', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg' },
    { id: 3, title: 'Berserk', image: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg' },
    { id: 4, title: 'Naruto', image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435524806l/204042.jpg' },
    { id: 5, title: 'Attack On Titan', image: 'https://cdn.myanimelist.net/images/manga/1/95517l.jpg' },
    { id: 6, title: 'Bleach', image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388508611l/2880.jpg' },
    { id: 7, title: 'Dragon Ball', image: 'https://m.media-amazon.com/images/I/515-EdWvVaL._SL500_.jpg' },
    { id: 8, title: 'Demon Slayer', image: 'https://cdn.myanimelist.net/images/manga/3/252239l.jpg' },
    { id: 9, title: 'The Catcher in the Rye', image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg' },

  ];

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axios.get('http://localhost:9004/api/auth/books/book');
        const booksData = res.data.books;
        const uniqueCategories = [...new Set(booksData.map(book => book.category))];
        setCategories(['All', ...uniqueCategories]); // Include 'All' option
        setBooks(booksData);
        setFilteredBooks(booksData); // Set initial filtered books
      } catch (error) {
        console.error('Error fetching books data:', error);
        setError(error.message);
      }
    };
    fetchBookData();
  }, []);

  const toggleWishlist = (bookId) => {
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter((id) => id !== bookId)
      : [...wishlist, bookId];
    setWishlist(newWishlist);
  };

  const filterBooksByCategory = (category) => {
    if (category === 'All') {
      setFilteredBooks(books); // Show all books if 'All' is selected
    } else {
      const filtered = books.filter(book => book.category === category);
      setFilteredBooks(filtered);
    }
  };

  const scrollToEnquiryForm = () => {
    enquiryFormRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='bg-#0D0B26 bg-opacity-900' style={{
      // backgroundImage: `url(${backgroundImage})`,
      backgroundImage: `url('https://sbmweb.com/wp-content/uploads/2019/07/sbm-dark-background.jpg')`,
      backgroundSize: 'repeat-y',
      // backgroundPosition: 'center',
      backgroundColor:'black'
    }}>
      {/* Header Section */}
      <div className="sticky top-0 flex justify-between items-center  py-1 px-24 z-50" 
      style={{
      // backgroundImage: `url(${backgroundImage})`,
      backgroundImage: `url('https://img.freepik.com/premium-vector/abstract-polygonal-space-background-with-connecting-dots-lines-concept-illustration_114588-1380.jpg')`,
      backgroundSize: 'fit',
      backgroundPosition: 'center',
    }}
    >
        <div className="flex items-center gap-4">
          <Link to="/" className="font-abril text-2xl">
            <img src={logo} className="w-32 shadow-lg " alt="Logo" />
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white">
           HOME
          </Link>
          <button onClick={scrollToEnquiryForm} className="text-white">
            ENQUIRY
          </button>
          <FontAwesomeIcon icon={faUser} className="text-white" />

          <Link to="/login" className="text-white">
            LOGIN
          </Link>
          <Link to="/register" className="text-white">
            SIGNUP
          </Link>
        </div>
      </div>

      <div className='my-2'><Carousel /></div>

      <div className="flex items-center justify-center my-4">
        {showPopularBooks ? (
          <PopularBooks popularBooks={popularBooks} />
        ) : (
          <div className="w-full">
            <div className='mx-24 mt-12 w-1/4'>
            <span className="font-lg mr-2 font-pacifico text-xl">Filter by Category : </span>
            <select onChange={(e) => filterBooksByCategory(e.target.value)} className='font-pacifico w-1/2 text-xl border rounded-lg px-4'>
              {categories.map((category, index) => (
                <option key={index} value={category} className='font-pacifico'>{category}</option>
              ))}
            </select>
            </div>
            <BooksSection
              books={books}
              filteredBooks={filteredBooks}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              error={error}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center my-1">
        <button
          onClick={() => setShowPopularBooks(!showPopularBooks)}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
        >
          {showPopularBooks ? 'View All Books' : 'Back to Popular Books'}
        </button>
      </div>
 {/* Author carousel */}
 <div>
        <AuthorsCarousel />
      </div>
      

      {/* Enquiry Form */}
      <div ref={enquiryFormRef} className='mt-16'>
        <EnquiryForm />
      </div>


      {/* Customer Feedback Carousel */}
      <div className='mt-16'>
        <FeedbackCarousel />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import logo from '../assets/logo3.png';
// import Footer from '../components/Footer';
// import Carousel from '../components/Carousel';
// import EnquiryForm from './EnquiryForm';
// import BooksSection from './BooksSection';
// // import BooksSection from '../components/BooksSection'; // Import the new component

// const HomePage = () => {
//   const [books, setBooks] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookData = async () => {
//       try {
//         const res = await axios.get('http://localhost:9004/api/auth/books/book');
//         const booksData = res.data.books;
//         const uniqueCategories = [...new Set(booksData.map(book => book.category))];
//         setCategories(['All', ...uniqueCategories]); // Include 'All' option
//         setBooks(booksData);
//         setFilteredBooks(booksData); // Set initial filtered books
//       } catch (error) {
//         console.error('Error fetching books data:', error);
//         setError(error.message);
//       }
//     };
//     fetchBookData();
//   }, []);

//   const toggleWishlist = (bookId) => {
//     const newWishlist = wishlist.includes(bookId)
//       ? wishlist.filter((id) => id !== bookId)
//       : [...wishlist, bookId];
//     setWishlist(newWishlist);
//   };

//   const filterBooksByCategory = (category) => {
//     if (category === 'All') {
//       setFilteredBooks(books); // Show all books if 'All' is selected
//     } else {
//       const filtered = books.filter(book => book.category === category);
//       setFilteredBooks(filtered);
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       {/* <Navbar /> */}

//       {/* Header Section */}
//       <div className="sticky top-0 flex justify-between items-center bg-gradient-to-r from-amber-500 to-pink-500 py-1 px-8 z-50">
//         <div className="flex items-center gap-4">
//           <Link to="/" className="font-abril text-2xl">
//             <img src={logo} className="w-32" alt="Logo" />
//           </Link>
//           {/* <span className="text-white">Welcome to our Bookstore</span> */}
//         </div>
//         <div className="flex items-center gap-8">
//           <Link to="/" className="text-white">
//             Home
//           </Link>
//           <FontAwesomeIcon icon={faUser} className="text-white" />
//           <Link to="/login" className="text-white">
//             Login
//           </Link>
//         </div>
//       </div>

//       <div className='my-2'><Carousel/></div>

//       {/* Filter by Category */}
//       <div className="flex items-center justify-center my-4">
//         <span className="font-bold mr-2">Filter by Category:</span>
//         <select onChange={(e) => filterBooksByCategory(e.target.value)}>
//           {categories.map((category, index) => (
//             <option key={index} value={category}>{category}</option>
//           ))}
//         </select>
//       </div>

//       {/* Display Books using BooksSection component */}
//       <BooksSection
//         books={books}
//         filteredBooks={filteredBooks}
//         wishlist={wishlist}
//         toggleWishlist={toggleWishlist}
//         error={error}
//       />

//       {/* Enquiry Form */}
//       <div>
//         <EnquiryForm />
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;
