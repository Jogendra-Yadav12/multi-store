import React, { useState, useEffect } from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

const images = [
  "https://img.freepik.com/free-psd/black-friday-big-sale-social-media-post-design-template_47987-25239.jpg",
  "https://img.freepik.com/free-vector/set-cosmetic-with-place-text-palm-leaf-skin-care-eucalyptus-extract-realistic_1268-15066.jpg",
  "https://img.freepik.com/free-vector/realistic-sunscreen-product-promo_52683-62426.jpg"
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide (optional)
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  mx-auto px-12 py-4">
      <div className="relative h-64 md:h-96 rounded-lg">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover rounded-md transition-all duration-500 ease"
        />

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white shadow-md text-2xl text-gray-600 hover:bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
        >
          <KeyboardArrowLeftOutlinedIcon sx={{ color: '#3FA8E9', fontSize:30 }} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white shadow-md text-2xl text-gray-600 hover:bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
        >
          <KeyboardArrowRightOutlinedIcon sx={{ color: '#3FA8E9', fontSize:30 }} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
