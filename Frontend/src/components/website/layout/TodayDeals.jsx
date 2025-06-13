import React, { useEffect, useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const TodayDeals = () => {

    const [topProducts, setTopProductes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/best-deals')
            .then((response) => {
                // console.log(response.data.data);
                setTopProductes(response.data.data);
            })
            .catch(err => {
                console.error("Error fetching Products:", err);

            })
    }, [])





    return (

        <div className='w-full mx-auto px-2 md:px-6 lg:px-12 py-4'>
            <div className='flex justify-between items-center text-gray-600 border-b border-gray-300 py-2'>
                <h1 className='text-2xl'>Today <span className='text-blue-600 font-semibold'>Top Deals</span></h1>
                <NavLink to="" className="flex items-center">View All <KeyboardArrowRightIcon color="primary" /></NavLink>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 3000 }}
                spaceBetween={20}
                navigation={false}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 1.2,
                    },
                    768: {
                        slidesPerView: 2.5,
                    },
                    1024: {
                        slidesPerView: 3.5,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                }}

                className='mySwiper py-5 p-5 w-full'
            >
                {
                    topProducts.map((items) => {
                        const productImageArray = items.images ? items.images.split(',') : []
                        const firstImage = productImageArray.slice(0, 1)[0]
                        const percentOff = Math.round(((items.price - items.discount_price) / items.price) * 100);
                        return (
                            <SwiperSlide key={items.id} >
                                <NavLink to={`/product-detail/${items.id}`}  >
                                    <div className="w-full bg-white text-left rounded-xl shadow-md border cursor-pointer overflow-hidden relative group hover:shadow-lg transition-all duration-300 hover:border-blue-400">

                                        {/* Top Discount Badge */}
                                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-sm font-semibold px-2 py-3 rounded-bl-lg z-10">
                                            {percentOff}% OFF
                                        </div>

                                        {/* Product Image */}
                                        <img
                                            src={`http://localhost:5000/uploads/${firstImage}`}
                                            alt={items.name}
                                            className="w-full rounded-xl h-52 object-contain p-4"
                                        />

                                        {/* Product Info */}
                                        <div className="px-4 py-3 border-t">
                                            <h4 className="text-gray-800 font-semibold text-md">{items.name.slice(0, 20)}..</h4>

                                            <div className="flex gap-2 mt-1">
                                                <span className="text-lg font-bold text-black">₹{items.discount_price}</span>
                                                <span className="text-sm text-gray-500 line-through">₹{items.price}</span>
                                            </div>

                                            <p className="text-green-600 text-sm mt-1 font-medium">
                                                Save - ₹{items.price - items.discount_price}
                                            </p>
                                        </div>
                                    </div>
                                </NavLink>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>


        </div>

    )
}

export default TodayDeals