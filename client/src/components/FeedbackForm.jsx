// FeedbackForm.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faFrown, faMeh, faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const FeedbackForm = ({ onClose }) => {
  const [willComeBack, setWillComeBack] = useState(null);
  const [bookRating, setBookRating] = useState(0);
  const [recommend, setRecommend] = useState(null);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token to ensure it's being retrieved
    if (!token) {
      alert('No token found. Please log in again.');
      return;
    }
    try {
      const res = await axios.post(
        'http://localhost:9004/api/feedback',
        { willComeBack, bookRating, recommend, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Response:', res.data); // Log the response
      if (res.data.success) {
        alert('Feedback submitted successfully');
        onClose();
      } 
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-5xl font-comforter mb-4 text-gray-400 text-center">We'd love some feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Will You Come Back?</label>
            <div className="flex gap-2 ">
              <FontAwesomeIcon icon={faFrown} className={`cursor-pointer text-4xl  ${willComeBack === 1 ? 'text-red-600' : 'text-red-200'}`} onClick={() => setWillComeBack(1)} />
              <FontAwesomeIcon icon={faMeh} className={`cursor-pointer text-4xl  ${willComeBack === 2 ? 'text-yellow-500' : 'text-yellow-200'}`} onClick={() => setWillComeBack(2)} />
              <FontAwesomeIcon icon={faSmile} className={`cursor-pointer text-4xl   ${willComeBack === 3 ? 'text-green-600' : 'text-green-200'}`} onClick={() => setWillComeBack(3)} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">How Would You Rate us Overall?</label>
            <div className="flex gap-2 text-black">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={`cursor-pointer text-4xl ${bookRating >= star ? 'text-yellow-500' : 'text-gray-200'}`}
                  onClick={() => setBookRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Will You Recommend Us to Friends?</label>
            <div className="flex gap-2">
              <FontAwesomeIcon icon={faThumbsDown} className={`cursor-pointer text-4xl ${recommend === false ? 'text-red-500' : 'text-red-200'}`} onClick={() => setRecommend(false)} />
              <FontAwesomeIcon icon={faThumbsUp} className={`cursor-pointer text-4xl ${recommend === true ? 'text-green-500' : 'text-green-200'}`} onClick={() => setRecommend(true)} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comments</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded text-black"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
