import React, { useState, useEffect } from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { assets } from '../../../assets/assets';

const images = [
  assets.bg_1,
  assets.bg_2,
  assets.bg_3,

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
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto px-12 py-4">
      <div className="relative md:h-96  rounded-lg">
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
