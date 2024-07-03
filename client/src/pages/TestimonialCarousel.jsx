import React from 'react';
import Carousel from 'react-responsive-carousel'; // or your carousel library
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const TestimonialCarousel = ({ testimonials }) => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Customer Feedback</h2>
        <Carousel showArrows={true} showStatus={false} showIndicators={false}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg">
              <img src={testimonial.avatar} className="w-16 h-16 rounded-full mx-auto mb-4" alt={testimonial.name} />
              <p className="text-gray-700 text-center">{testimonial.comment}</p>
              <p className="text-gray-600 text-center mt-2">- {testimonial.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
