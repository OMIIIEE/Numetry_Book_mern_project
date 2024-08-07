// import React, { useState } from 'react';
// import Pagination from './Pagination';

// const Booking = ({ bookings }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const bookingsPerPage = 8;

//   // Flatten bookings array
//   const flattenedBookings = bookings.map(booking => ({ ...booking }));

//   // Calculate the current bookings
//   const indexOfLastBooking = currentPage * bookingsPerPage;
//   const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//   const currentBookings = flattenedBookings.slice(indexOfFirstBooking, indexOfLastBooking);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Get row spans for each user to merge cells
//   const userRowSpans = {};
//   currentBookings.forEach((booking, index) => {
//     if (!userRowSpans[booking.email]) {
//       userRowSpans[booking.email] = 1;
//     } else {
//       userRowSpans[booking.email]++;
//     }
//   });

//   return (
//     <div className="container p-8 w-full flex flex-col items-center">
//       <h2 className="text-2xl font-abril mb-4">Booking  Information</h2>
//       <table className="min-w-full w-[1400px] bg-white border border-gray-200">
//         <thead className='bg-gray-100'>
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">User Name</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Email</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Book Name</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Author</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Price</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Quantity</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Total Price</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Booking Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentBookings.map((booking, index) => {
//             const isFirstOfUser = index === 0 || booking.email !== currentBookings[index - 1].email;
//             return (
//               <tr key={index} className='text-center'>
//                 {isFirstOfUser && (
//                   <td
//                     className="py-2 px-4 border-b align-middle border border-gray-300"
//                     rowSpan={userRowSpans[booking.email]}
//                   >
//                     {booking.userName}
//                   </td>
//                 )}
//                 {isFirstOfUser && (
//                   <td
//                     className="py-2 px-4 border-b align-middle border border-gray-300"
//                     rowSpan={userRowSpans[booking.email]}
//                   >
//                     {booking.email}
//                   </td>
//                 )}
//                 <td className="py-2 px-4 border-b border border-gray-300">{booking.bookName}</td>
//                 <td className="py-2 px-4 border-b border border-gray-300">{booking.author}</td>
//                 <td className="py-2 px-4 border-b border border-gray-300">Rs {booking.price}</td>
//                 <td className="py-2 px-4 border-b border border-gray-300">{booking.quantity}</td>
//                 <td className="py-2 px-4 border-b border border-gray-300">Rs {booking.totalPrice}</td>
//                 <td className="py-2 px-4 border-b border border-gray-300">{booking.date}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <Pagination
//         totalPages={Math.ceil(flattenedBookings.length / bookingsPerPage)}
//         paginate={paginate}
//         currentPage={currentPage}
//       />
//     </div>
//   );
// };

// export default Booking;


// import React, { useState } from 'react';
import React, { useState } from 'react';
import Pagination from './Pagination';

const Booking = ({ bookings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;

  // Calculate current bookings for the current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container p-8 w-full flex flex-col items-center">
      <h2 className="text-2xl font-abril mb-4">Booking Information</h2>
      <table className="min-w-full w-[1400px] bg-white border border-gray-200">
        <thead className='bg-gray-100'>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">User Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Book Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Total Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-300">Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking, index) => (
            <tr key={index} className='text-center'>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.userName}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.email}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.bookName}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.author}</td>
              <td className="py-2 px-4 border-b border border-gray-300">Rs {booking.price}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.quantity}</td>
              <td className="py-2 px-4 border-b border border-gray-300">Rs {booking.totalPrice}</td>
              <td className="py-2 px-4 border-b border border-gray-300">{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={Math.ceil(bookings.length / bookingsPerPage)}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Booking;
