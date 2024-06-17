import React, { useState } from "react";
import axios from "axios";

import { Form, FormGroup, Button } from "reactstrap";

import { X } from "lucide-react";

const AddBookForm = ({ isAdmin, closeModal }) => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    publisher: "",
    publishDate: "",
    copies: 0,
    imageLink:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const addBook = async (e) => {
    e.preventDefault();
    const { name, author, publisher, publishDate, copies,imageLink } = book;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:9003/api/auth/books",
        { name, author, publisher, publishDate, copies ,imageLink},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   alert("Book added successfully");
      setBook({
        name: "",
        author: "",
        publisher: "",
        publishDate: "",
        copies: 0,
        imageLink:""
      });
      alert(res.data.message);
      closeModal();
    } catch (error) {
      console.log(error);
      alert("book submission failed .Please Try again");
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm  bg-[#5AB2FF] flex flex-col justify-center items-center h-auto overflow-y-auto z-30 -mt-6">
      <div className="mt-10 flex flex-col gap-5  w-2/5">
        <button className="place-self-end" onClick={closeModal}>
          <X size={30} />
        </button>
        <div className=" rounded-xl px-20 py-10 bg-indigo-600 flex flex-col gap-5 items-center mx-4">
          <h2 className="text-center mb-2 text-5xl text-white font-comforter">
            Add Book
          </h2>
          <Form onSubmit={addBook} className="flex gap-4 flex-col">
            <FormGroup>
              <label className="text-white">Book Name:</label>
              <input
                type="text"
                name="name"
                value={book.name}
                onChange={handleChange}
                placeholder="Enter your Full Name"
                className="w-full p-2.5 rounded-lg border-none text-base"
                required
              />
              {/* {errors.name && <p className="text-red-700">{errors.name}</p>} */}
            </FormGroup>
            <FormGroup>
              <label className="text-white">Author:</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className="w-full p-2.5 rounded-lg border-none text-base"
                required
              />
              {/* {errors.username && <p className="text-red-700">{errors.username}</p>} */}
            </FormGroup>
            <FormGroup>
              <label className="text-white">Publisher:</label>
              <input
                type="text"
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
                placeholder="Enter publisher name"
                className="w-full p-2.5 rounded-lg border-none text-base"
                required
              />
              {/* {errors.email && <p className="text-red-700">{errors.email}</p>} */}
            </FormGroup>

            <FormGroup>
              <label className="text-white">Publishing Date:</label>
              <input
                type="date"
                name="publishDate"
                value={book.publishDate}
                onChange={handleChange}
                placeholder="Enter your Phone No."
                className="w-full p-2.5 rounded-lg border-none text-base"
                required
              />
              {/* {errors.phone && <p className="text-red-700">{errors.phone}</p>} */}
            </FormGroup>

            <FormGroup>
              <label className="text-white">Number of Copies:</label>
              <input
                type="number"
                name="copies"
                value={book.copies}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="w-full p-2.5 rounded-lg border-none text-base"
                required
              />
              {/* {errors.password && (
            <p className="text-red-700 text-sm">{errors.password}</p>
          )} */}
            </FormGroup>
            <FormGroup>
              <label className="text-white">Book Image Link:</label>
              <input
                type="text"
                name="imageLink"
                value={book.imageLink}
                onChange={handleChange}
                placeholder="Enter Book Image Link"
                className="w-full p-2.5 rounded-lg border-none text-base"
                required
              />
              {/* {errors.phone && <p className="text-red-700">{errors.phone}</p>} */}
            </FormGroup>

            <Button
              className="inline-block px-6 py-1 bg-white text-[#5AB2FF] font-medium border-2 rounded hover:bg-transparent hover:text-white transition-colors duration-300"
              type="submit"
              color="success"
            >
              Add Book
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddBookForm;
