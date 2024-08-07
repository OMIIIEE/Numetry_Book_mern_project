import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import logo from '../assets/logo3.png';

const Navbar = ({ user, role, onAddBookClick, toggleBookDetails, toggleBookingDetails, toggleUserDetails ,toggleEnquiryDetails}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:9004/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        localStorage.removeItem("token");
        alert("Logged out successfully");
        navigate("/", { replace: true });
      } else {
        alert("Logout failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Logout failed due to a network or server error.");
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? "text-black" : "text-white";
  };

  return (
    <div className="navbar sticky top-0 text-white p-1 px-20 flex justify-between items-center w-full bg-gradient-to-r from-amber-500 to-pink-500 z-40">
      <div className="navbar-brand">
        <Link to="/admin-dashboard" className="font-abril text-2xl">
          <img src={logo} className="w-[7rem]" alt="Logo" />
        </Link>
      </div>
      <div className="flex items-center flex-row gap-8">
        <button onClick={onAddBookClick} className={getLinkClass("/add-book")}>
          Add Book
        </button>
        <button onClick={toggleUserDetails} className={getLinkClass("/user-list")}>
          User List
        </button>
        <button onClick={toggleBookDetails} className={getLinkClass("/book-details")}>
          Book Details
        </button>
        <button onClick={toggleBookingDetails} className={getLinkClass("/purchase-details")}>
          Purchase Details
        </button>
        <button onClick={toggleEnquiryDetails} className={getLinkClass("/purchase-details")}>
          Enquiries 
        </button>
        <FontAwesomeIcon icon={faUser} className="text-white" />
        <button onClick={handleLogout} className="bg-transparent border-0 text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
