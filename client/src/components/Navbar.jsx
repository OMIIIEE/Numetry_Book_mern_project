import React, { useState } from "react";
import {Link,useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'


const Navbar = ({ user,role,onAddBookClick,toggleBookDetails }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [showModal,setShowModal] = useState(false)

  const handleLogout = async({user}) => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   alert("No token found, please log in again.");
    //   navigate("/login");
    //   return;
    // }

    try {
      const res = await axios.post(
        "http://localhost:9003/api/auth/logout",
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
   



  return (
    <div className="navbar bg-[#5AB2FF] text-white p-4 px-12 flex justify-between items-center w-full">
      <div className="navbar-brand">Dashboard</div>
      <div className="flex items-center flex-row gap-8">
      
      {/* {role === "admin" && ( */}
          <button onClick={onAddBookClick} className="">
            Add Book
          </button>
          <button onClick={toggleBookDetails} className="">
              Book Details
            </button>
        {/* )} */}
  
        <FontAwesomeIcon icon={faUser} className="" />
       
        <button
          onClick={handleLogout}
          className="bg-transparent border-0 text-white "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
