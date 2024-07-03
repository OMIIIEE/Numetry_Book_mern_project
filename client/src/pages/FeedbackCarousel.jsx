// src/components/FeedbackCarousel.jsx
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import StarRating from '../components/StarRating';

const FeedbackCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:9004/api/feedback');
        if (response.data.success) {
          setTestimonials(response.data.latestFeedbacks);
        } else {
          setError('Failed to fetch feedback');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedback();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" py-8 bg-transparent">
      <div className="container mx-auto flex flex-col ">
        <h2 className="text-3xl md:text-5xl mb-4 text-[#FDC702] font-comforter text-center">Customer Feedback</h2>
        <Carousel showArrows={true} showStatus={false} showIndicators={true} infiniteLoop={true} autoPlay={true} interval={3000} >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex justify-center  p-8 ">
              <div className="testimonial  text-white p-8 rounded-3xl border-yellow-500 border-t-4 border-b-4 w-full md:w-1/2 mx-2 ">
                <div className="pic w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src={testimonial.adminAvatar} className="w-full h-auto" alt={testimonial.adminName} />
                </div>
                <h3 className="title text-yellow-500 text-lg font-semibold uppercase">{testimonial.adminName}</h3>
                <p className="description text-base">{testimonial.feedback.comment}</p>
                <StarRating rating={testimonial.feedback.bookRating} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default FeedbackCarousel;




// src/components/FeedbackCarousel.jsx
// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import StarRating from '../components/StarRating';
// // import StarRating from './StarRating';

// const FeedbackCarousel = ({ testimonials }) => {
//   return (
//     <div className="bg-gray-100 py-8">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-semibold text-center mb-8">Customer Feedback</h2>
//         <Carousel showArrows={true} showStatus={false} showIndicators={false} infiniteLoop={true} autoPlay={true} interval={5000}>
//           {testimonials.reduce((acc, testimonial, index) => {
//             if (index % 2 === 0) {
//               acc.push(testimonials.slice(index, index + 2));
//             }
//             return acc;
//           }, []).map((testimonialPair, index) => (
//             // <div key={index} className="flex justify-center gap-4">
//             //   {testimonialPair.map((testimonial, subIndex) => (
//             //     <div key={subIndex} className="bg-white p-8 rounded-lg shadow-lg w-1/2 flex flex-col items-center justify-center">
//             //       <div className='w-16 flex items-center justify-center'>
//             //       <img src={testimonial.avatar} className=" h-16 rounded-full  mb-4 " alt={testimonial.name} /></div>
//             //       <StarRating rating={testimonial.rating} />
//             //       <p className="text-gray-700 text-center">{testimonial.comment}</p>
//             //       <p className="text-gray-600 text-center mt-2">- {testimonial.name}</p>
//             //     </div>
//             //   ))}
//             // </div>



//     <div className="row">
//         <div className="col-md-8">
//             <div id="testimonial-slider" key={index} className="owl-carousel">
//             {testimonialPair.map((testimonial, subIndex) => (
//                 <div key={subIndex} className="testimonial">
//                     <div className="pic">
//                         <img src={testimonial.avatar} />
//                     </div>
//                     <h3 className="title">Williamson{testimonial.name}</h3>
             
//                     <p className="description">
//                     {testimonial.comment}
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium ad asperiores at atque culpa dolores eaque fugiat hic illo ipsam ipsum minima modi necessitatibus nemo officia, omnis perferendis placeat sit vitae, consectetur adipisicing elit ipsam.
//                     </p>
//                     <StarRating rating={testimonial.rating} />
//                 </div>
//               ))}
//             </div>
//         </div>
//     </div>


//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default FeedbackCarousel;

// src/components/FeedbackCarousel.jsx
// src/components/FeedbackCarousel.jsx



// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import StarRating from '../components/StarRating';

// const FeedbackCarousel = ({ testimonials }) => {
//   return (
//     <div className="bg-gray-800 py-8">
//       <div className="container mx-auto">
//         <h2 className="text-3xl md:text-5xl mb-4 text-[#FDC702] font-comforter text-center">Customer Feedback</h2>
//         <Carousel showArrows={true} showStatus={false} showIndicators={true} infiniteLoop={true} autoPlay={true} interval={5000}>
//           {testimonials.reduce((acc, testimonial, index) => {
//             if (index % 2 === 0) {
//               acc.push(testimonials.slice(index, index + 2));
//             }
//             return acc;
//           }, []).map((testimonialPair, index) => (
//             <div key={index} className="flex justify-center gap-4">
//               {testimonialPair.map((testimonial, subIndex) => (
//                 <div key={subIndex} className="testimonial bg-gray-800 text-white p-8 rounded-3xl border-yellow-500 border-t-4 border-b-4 w-full md:w-1/2 mx-2">
//                   <div className="pic w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
//                     <img src={testimonial.avatar} className="w-full h-auto" alt={testimonial.name} />
//                   </div>
//                   <h3 className="title text-yellow-500 text-lg font-semibold uppercase">{testimonial.name}</h3>
//                   <p className="description text-base">{testimonial.comment}</p>
//                   <StarRating rating={testimonial.rating} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default FeedbackCarousel;


