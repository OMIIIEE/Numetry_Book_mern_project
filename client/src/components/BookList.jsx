import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const BookList = ({
  books,
  wishlist,
  onToggleWishlist,
  user,
  categorisedBooks,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [copiesBought, setCopiesBought] = useState({});
  const [showViewMoreModal, setShowViewMoreModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity to buy
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const openBookDetails = (book) => {
    setSelectedBook(book);
    setShowViewMoreModal(true); // Show View More modal when book details are opened
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
    setShowViewMoreModal(false);
  };

  const toggleWishlist = (bookId) => {
    onToggleWishlist(bookId);
  };

  const handleBuyClick = (bookId) => {
    setSelectedBook(books.find((book) => book._id === bookId));
    setShowBuyModal(true); // Show Buy modal when Buy button is clicked
  };

  const handleConfirmBuy = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:9004/api/purchases",
        {
          userId: user._id,
          bookId: selectedBook._id,
          quantity: quantity,
          address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`Book "${selectedBook.name}" has been purchased successfully!`);
      setCopiesBought({
        ...copiesBought,
        [selectedBook._id]: (copiesBought[selectedBook._id] || 0) + quantity,
      });
      setShowBuyModal(false); // Close Buy modal after successful purchase
      setQuantity(1); // Reset quantity after purchase
      setAddress({ street: "", city: "", state: "", postalCode: "" }); // Reset address after purchase
    } catch (error) {
      console.error("Error purchasing book:", error);
      // Handle error
    }
  };

  const handleChangeQuantity = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10">
      {books.map((book) => (
        <Card
          key={book._id}
          className="border-none shadow-lg h-auto w-auto flex flex-col items-center py-4"
        >
          <div className="relative ">
            <img
              src={book.imageLink || "https://via.placeholder.com/150"}
              alt={book.name}
              className="h-[38vh] object-cover rounded-t-md z-10"
            />
            <button
              className="absolute top-[-10px] right-[-10px] z-10"
              onClick={() => toggleWishlist(book._id)}
            >
              <FaHeart
                className={`text-2xl ${
                  wishlist.includes(book._id) ? "text-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          <CardBody className="px-2 pt-2">
            <div className="flex items-center flex-col gap-1 justify-between">
              <div className="flex items-center flex-col gap-2">
                <h3 className="text-2xl text-center h-16 font-abril ">
                  <Link
                    to={`#`}
                    className="text-[#00224D] hover:text-[#029D9D] no-underline "
                  >
                    {book.name}
                  </Link>
                </h3>
                <span className="flex items-center gap-1 font-medium text-[#00224D] text-sm">
                  {book.authorName && (
                    <p>
                      By <strong>{book.authorName}</strong>
                    </p>
                  )}
                </span>
                <span className="flex items-center text-[#00224D] font-medium text-sm">
                  {book.publisherName && (
                    <p>
                      Publisher : <strong>{book.publisherName}</strong>
                    </p>
                  )}
                </span>
                <span className="flex items-center text-[#00224D] text-sm">
                  <p>
                    Copies :
                    <strong className="font-semibold">
                      {" "}
                      {book.copies - (copiesBought[book._id] || 0)}
                    </strong>
                  </p>
                </span>
                <span className="flex items-center text-[#00224D] text-sm">
                  <p>
                    Price :{" "}
                    <strong className="font-semibold">Rs {book.price} </strong>
                  </p>
                </span>

                <div className="flex items-center justify-between text-gray-600">
                  <h5 className="text-md font-semibold">
                    Published Date : {new Date(book.publishDate).toDateString()}
                  </h5>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 gap-20 bottom-0">
                <button
                  className="bg-[#FF9F66] text-white px-4 py-1 rounded-lg hover:bg-[#FF6500]"
                  onClick={() => handleBuyClick(book._id)}
                >
                  Buy
                </button>
                <button
                  className="bg-[#FF90BB] text-white px-4 py-1 rounded-lg hover:bg-[#FF2171]"
                  onClick={() => openBookDetails(book)}
                >
                  View More
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
      {selectedBook && showViewMoreModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-3/5">
            <div className="mb-4">
              <h2 className="text-3xl mb-2 font-abril text-purple-600">{selectedBook.name}</h2>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <img
                    src={
                      selectedBook.imageLink ||
                      "https://via.placeholder.com/150"
                    }
                    alt={selectedBook.name}
                    className="mb-2 object-cover rounded-md w-full h-60"
                  />
                </div>
                <div>
                  <p className="text-gray-700 text-md text-left">
                    Author : {selectedBook.authorName}
                  </p>
                  <p className="text-gray-700 text-md text-left">
                    Publisher : {selectedBook.publisherName}
                  </p>
                  <p className="text-gray-700 text-md text-left">
                    Copies Available :
                    {selectedBook.copies -
                      (copiesBought[selectedBook._id] || 0)}
                  </p>
                  <p className="text-gray-700 text-md text-left">
                    Price : Rs {selectedBook.price}
                  </p>
                  <p className="text-gray-700 text-md text-left">
                    Publish Date : {new Date(selectedBook.publishDate).toDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">{selectedBook.summary}</p>
            </div>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              onClick={closeBookDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedBook && showBuyModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-1/3 flex flex-col justify-center items-center shadow-lg">
            <h2 className="text-3xl  mb-4 font-abril text-purple-500">
              {selectedBook.name}
            </h2>
            <p className="text-gray-700 mb-2">
              Book Price: Rs {selectedBook.price}
            </p>
            <label className="block mb-2">
              Quantity:
              <input
                type="number"
                className="border px-3 py-2 rounded-lg w-full mt-1"
                value={quantity}
                onChange={handleChangeQuantity}
                min="1"
              />
            </label>
            <p className="mt-2 text-gray-700">
              Total Price: Rs {selectedBook.price * quantity}
            </p>

            <div className="w-full mt-4">
              <h1 className="text-lg font-semibold mb-2">DELIVERY ADDRESS</h1>
              <label className="block mb-2 text-left">
                Street:
                <input
                  type="text"
                  name="street"
                  className="border px-3 py-2 rounded-lg w-full mt-1 "
                  value={address.street}
                  onChange={handleAddressChange}
                />
              </label>
              <label className="block mb-2 text-left">
                City:
                <input
                  type="text"
                  name="city"
                  className="border px-3 py-2 rounded-lg w-full mt-1"
                  value={address.city}
                  onChange={handleAddressChange}
                />
              </label>
              <label className="block mb-2 text-left">
                State:
                <input
                  type="text"
                  name="state"
                  className="border px-3 py-2 rounded-lg w-full mt-1"
                  value={address.state}
                  onChange={handleAddressChange}
                />
              </label>
              <label className="block mb-4 text-left">
                Postal Code:
                <input
                  type="text"
                  name="postalCode"
                  className="border px-3 py-2 rounded-lg w-full mt-1"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                />
              </label>
            </div>

            <div className="mt-4 flex justify-end w-full">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={handleConfirmBuy}
              >
                Confirm Purchase
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setShowBuyModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;

// import React, { useState } from "react";
// import { Card, CardBody } from "reactstrap";
// import { Link } from "react-router-dom";
// import { FaHeart } from "react-icons/fa";
// import axios from "axios";

// const BookList = ({ books, wishlist, onToggleWishlist, user ,categorisedBooks}) => {
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [copiesBought, setCopiesBought] = useState({});
//   const [showViewMoreModal, setShowViewMoreModal] = useState(false);
//   const [showBuyModal, setShowBuyModal] = useState(false);
//   const [quantity, setQuantity] = useState(1); // Default quantity to buy

//   const openBookDetails = (book) => {
//     setSelectedBook(book);
//     setShowViewMoreModal(true); // Show View More modal when book details are opened
//   };

//   const closeBookDetails = () => {
//     setSelectedBook(null);
//     setShowViewMoreModal(false);
//   };

//   const toggleWishlist = (bookId) => {
//     onToggleWishlist(bookId);
//   };

//   const handleBuyClick = (bookId) => {
//     setSelectedBook(books.find((book) => book._id === bookId));
//     setShowBuyModal(true); // Show Buy modal when Buy button is clicked
//   };

//   const handleConfirmBuy = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:9004/api/purchases",
//         {
//           userId: user._id,
//           bookId: selectedBook._id,
//           quantity: quantity,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert(`Book "${selectedBook.name}" has been purchased successfully!`);
//       setCopiesBought({
//         ...copiesBought,
//         [selectedBook._id]: (copiesBought[selectedBook._id] || 0) + quantity,
//       });
//       setShowBuyModal(false); // Close Buy modal after successful purchase
//       setQuantity(1); // Reset quantity after purchase
//     } catch (error) {
//       console.error("Error purchasing book:", error);
//       // Handle error
//     }
//   };

//   const handleChangeQuantity = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-10">
//       {books.map((book) => (
//         <Card
//           key={book._id}
//           className="border-none shadow-lg h-auto w-auto flex flex-col items-center py-4"
//         >
//           <div className="relative ">
//             <img
//               src={book.imageLink || "https://via.placeholder.com/150"}
//               alt={book.name}
//               className="h-[38vh] object-cover rounded-t-md z-10"
//             />
//             <button
//               className="absolute top-[-10px] right-[-10px] z-10"
//               onClick={() => toggleWishlist(book._id)}
//             >
//               <FaHeart
//                 className={`text-2xl ${
//                   wishlist.includes(book._id)
//                     ? "text-red-500"
//                     : "text-gray-400"
//                 }`}
//               />
//             </button>
//           </div>

//           <CardBody className="px-2 pt-2">
//             <div className="flex items-center flex-col gap-1 justify-between">
//               <div className="flex items-center flex-col gap-2">
//                 <h3 className="  text-2xl  text-center h-16 font-abril ">
//                   <Link
//                     to={`#`}
//                     className="text-[#00224D] hover:text-[#029D9D] no-underline "
//                   >
//                     {book.name}
//                   </Link>
//                 </h3>
//                 <span className="flex items-center gap-1 font-medium text-[#00224D] text-sm">
//                   {book.authorName && (
//                     <p>
//                       {/* By  <strong>{book.authorName.name}</strong>  */}
//                       By  <strong>{book.authorName}</strong>
//                     </p>
//                   )}
//                 </span>
//                 <span className="flex items-center text-[#00224D] font-medium text-sm">
//                   {book.publisherName && (
//                     <p>
//                       {/* Publisher : <strong>{book.publisherName.name}</strong>  */}
//                       Publisher : <strong>{book.publisherName}</strong>
//                     </p>
//                   )}
//                 </span>
//                 <span className="flex items-center  text-[#00224D]  text-sm">
//                <p>Copies :
//                   <strong className="font-semibold"> {book.copies - (copiesBought[book._id] || 0)}</strong>
//                   </p>
//                 </span>
//                 <span className="flex items-center  text-[#00224D]  text-sm">
//                   <p>
//                   Price : <strong className="font-semibold">Rs {book.price} </strong>
//                   </p>
//                 </span>

//                 <div className="flex items-center justify-between  text-gray-600">
//                   <h5 className="text-md font-semibold">
//                     Published Date :{" "}
//                     {new Date(book.publishDate).toDateString()}
//                   </h5>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between mt-2 gap-20 bottom-0">
//                 <button
//                   className="bg-[#FF9F66] text-white px-4 py-1 rounded-lg hover:bg-[#FF6500]"
//                   onClick={() => handleBuyClick(book._id)}
//                 >
//                   Buy
//                 </button>
//                 <button
//                   className="bg-[#FF90BB] text-white px-4 py-1 rounded-lg hover:bg-[#FF2171]"
//                   onClick={() => openBookDetails(book)}
//                 >
//                   View More
//                 </button>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//       ))}
//  {selectedBook && showViewMoreModal && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-3/5">
//             <div className="mb-4">
//               <h2 className="text-3xl  mb-2 font-abril">{selectedBook.name}</h2>
//               <p className="text-gray-700 text-sm">Author : {selectedBook.authorName}</p>
//               <p className="text-gray-700 text-sm">Publisher : {selectedBook.publisherName}</p>
//               <p className="text-gray-700 text-sm">
//                 Copies Available :
//                 {selectedBook.copies - (copiesBought[selectedBook._id] || 0)}
//               </p>
//               <p className="text-gray-700 text-sm">Price : Rs {selectedBook.price}</p>
//             </div>
//             <div className="mb-4">
//               <p className="text-gray-700">{selectedBook.summary}</p>
//             </div>
//             <button
//               className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
//               onClick={closeBookDetails}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

// {selectedBook && showBuyModal && (
//   <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white p-4 rounded-lg max-w-md w-1/3">
//       <h2 className="text-2xl font-semibold mb-2">{selectedBook.name}</h2>
//       <p>Price: Rs {selectedBook.price}</p>
//       <label className="block mt-4">
//         Quantity:
//         <input
//           type="number"
//           className="border px-2 py-1 rounded-lg w-full"
//           value={quantity}
//           onChange={handleChangeQuantity}
//           min="1"
//         />
//       </label>
//       {/* Calculate total price */}
//       <p className="mt-2">Total Price: Rs {selectedBook.price * quantity}</p>
//       <div className="mt-4 flex justify-end gap-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
//           onClick={handleConfirmBuy}
//         >
//           Buy
//         </button>
//         <button
//           className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-400"
//           onClick={() => setShowBuyModal(false)}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default BookList;
