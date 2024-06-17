import React from 'react';

const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-4">
      <ul className="inline-flex items-center -space-x-px gap-2">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight border rounded-lg transition-colors duration-300 ${
                number === currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-blue-500 border-gray-300 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
