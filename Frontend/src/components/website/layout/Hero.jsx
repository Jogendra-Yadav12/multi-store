import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import { assets } from '../../../assets/assets';

const images = [assets.bg_1, assets.bg_2, assets.bg_3];

const Hero = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="relative w-full mx-auto px-12 py-4 pt-24">
      <div className="relative md:h-96 rounded-lg">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay]}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="w-full h-full rounded-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-md transition-all duration-500 ease-in-out"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -left-8 z-10 transform -translate-y-1/2 bg-white shadow-md text-gray-600 hover:bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
        >
          <KeyboardArrowLeftOutlinedIcon sx={{ color: '#3FA8E9', fontSize: 30 }} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 -right-8 z-10 transform -translate-y-1/2 bg-white shadow-md text-gray-600 hover:bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
        >
          <KeyboardArrowRightOutlinedIcon sx={{ color: '#3FA8E9', fontSize: 30 }} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
