import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import UserList from "../../components/UserList";
import AddBookForm from "../../components/AddBookForm";
import ShowBooks from "../../components/ShowBooks";
import BookDetails from "../../components/BookDetails";

const AdminDashboard = () => {
  const [user, setUser] = useState({});
  const [books,setBooks]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:9003/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched user data:", res.data.users); // Log the fetched data
        setUser(res.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);


  const handleAddBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const toggleBookDetails = () => {
    setShowBookDetails(!showBookDetails);
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

  return (
    <div className="w-full flex items-center flex-col ">
      <Navbar role="admin" onAddBookClick={handleAddBookClick} toggleBookDetails={toggleBookDetails}/>
      <div className="container items-center flex flex-col gap-8 p-8">
        <div className="text-3xl">Welcome to Admin Dashboard</div>
        <UserList user={user} />
       {showBookDetails && <BookDetails books={books} setBooks={setBooks} />} 
      </div>
      {showModal && <AddBookForm isAdmin={true} closeModal={handleCloseModal} className="-mt-4"/>}
      
    </div>
  );
};

export default AdminDashboard;
