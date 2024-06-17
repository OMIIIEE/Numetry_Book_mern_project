import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetails = ({ books, setBooks }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState(null);

  // Function to aggregate user purchases
  const aggregateUserPurchases = (userPurchases) => {
    if (!userPurchases || userPurchases.length === 0) {
      return [];
    }

    const userMap = new Map();

    // Aggregate quantities per user
    userPurchases.forEach((purchase) => {
      const { user, quantity } = purchase;
      if (userMap.has(user)) {
        userMap.set(user, userMap.get(user) + quantity);
      } else {
        userMap.set(user, quantity);
      }
    });

    // Convert Map to array of objects
    const aggregatedPurchases = Array.from(
      userMap,
      ([user, totalCopiesBought]) => ({ user, totalCopiesBought })
    );

    return aggregatedPurchases;
  };

  // Function to handle edit mode
  const handleEdit = (book) => {
    setEditMode(true);
    setEditedBook({
      ...book,
      newTotalCopies: book.originalCopies , // Initialize newTotalCopies with current originalCopies
    });
  };

  // Function to handle cancel edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedBook(null);
  };

  // Function to handle save edit
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const newTotalAvailable = editedBook.newTotalCopies - editedBook.totalBought;
      const response = await axios.put(
        `http://localhost:9003/api/auth/books/${editedBook._id}`,
        {
          copies: editedBook.newTotalCopies,
          // originalCopies: editedBook.newTotalCopies,
          // totalAvailable: newTotalAvailable,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedBook = response.data.book;

      // Update state with updated book
      // const updatedBooks = books.map((book) =>
      //   book._id === updatedBook._id ? updatedBook : book
      // );

      // Update state with updated book
       const updatedBooks = books.map((book) =>
        book._id === updatedBook._id
          ? {
              ...book,
              originalCopies: editedBook.newTotalCopies,
              totalAvailable: editedBook.newTotalCopies - book.totalBought,
            }
          : book
      );

      setBooks(updatedBooks); // Update books state with the updatedBooks array
      setEditMode(false);
      setEditedBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
      // Handle error state or notification
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:9003/api/auth/books/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(
        `Book "${books.find((book) => book._id === id)?.name}" has been deleted successfully!`
      );

      if (response.data.success) {
        // Remove the deleted book from the state
        setBooks(books.filter((book) => book._id !== id));
      } else {
        console.log('Failed to delete book:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container p-8 w-full flex flex-col items-center">
      <h2 className="text-3xl mb-6">Book Details</h2>
      {books.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto w-[1300px]">
          <table className="min-w-full w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Book Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Copies Published
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Available Copies
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Copies Bought
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Copies Bought by Users
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book._id}>
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {book.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editMode && editedBook?._id === book._id ? (
                      <input
                        type="number"
                        className="border rounded-md px-2 py-1"
                        value={editedBook.newTotalCopies}
                        onChange={(e) =>
                          setEditedBook({
                            ...editedBook,
                            newTotalCopies: parseInt(e.target.value, 10),
                          })
                        }
                      />
                    ) : (
                      book.originalCopies
                    )}
                  </td>
                 
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.originalCopies}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editMode && editedBook?._id === book._id
                      ? editedBook.newTotalCopies - book.totalBought
                      : book.totalAvailable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.totalBought}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                    {aggregateUserPurchases(book.userPurchases).map(
                      (purchase, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2">{purchase.user}</div>
                          <div className="px-2 py-1 rounded-md">
                            {purchase.totalCopiesBought}
                          </div>
                        </div>
                      )
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editMode && editedBook?._id === book._id ? (
                      <>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded-md"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                          onClick={() => handleEdit(book)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
