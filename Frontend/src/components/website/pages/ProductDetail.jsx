import React, { useEffect, useState } from 'react'
import Footer from '../layout/Footer'
import NavBar from '../layout/NavBar'
import NavCategories from '../layout/NavCategories'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { useAuth } from '../../../context/AuthContext'
import { toast } from 'react-toastify'
import { useApp } from '../../../context/AppContext'

const ProductDetail = () => {

    const { cartItems, setCartItems,fetchCartCount } = useApp()
    const { user } = useAuth()
    const { id } = useParams()
    const [fetchProduct, setFetchProducts] = useState([]);
    const [mainImage, setMainImage] = useState('');

   const handleAddToCart = async () => {
    try {
        const product = fetchProduct[0];
        const imagesArray = product.images ? product.images.split(",") : [];
        const mainImageUrl = `http://localhost:5000/uploads/${imagesArray[0]}`;

        const existingItem = cartItems.find(item => item.product_id === product.id);

        if (existingItem) {
            // ✅ Already in cart – increase quantity (no max limit)
            const updatedQty = existingItem.quantity + 1;

            await axios.put(`http://localhost:5000/api/updateCart/${existingItem.id}`, {
                product_id: existingItem.product_id,
                customer_id: existingItem.customer_id,
                quantity: updatedQty
            });

            // Update local state
            setCartItems(prev =>
                prev.map(item =>
                    item.id === existingItem.id ? { ...item, quantity: updatedQty } : item
                )
            );

            toast.success("Quantity increased in your cart.");
        } else {
            // Not in cart – add as new
            const addCartData = {
                product_id: product.id,
                name: product.name,
                image: mainImageUrl,
                quantity: 1,
                price: product.discount_price,
                customer_id: user.id,
            };

            const response = await axios.post('http://localhost:5000/api/add-cart', addCartData);

            if (response.data.status === 'success') {
                toast.success(response.data.message);
                fetchCartCount(user.id); // optional: update cartItems
            } else {
                toast.error(response.data.message);
            }
        }
    } catch (error) {
        console.error("Cart API Error:", error);
        toast.error("Something went wrong while adding to cart.");
    }
};

    // Add to Cart Api 

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/product/${id}`)
                .then((res) => {
                    const product = res.data;
                    const imagesArray = product.images ? product.images.split(",") : [];
                    setFetchProducts([product]);
                    if (imagesArray.length > 0) {
                        setMainImage(`http://localhost:5000/uploads/${imagesArray[0]}`);
                    }
                })
                .catch((err) => {
                    console.error("API Error", err);
                    setFetchProducts([]);
                });
        }
    }, [id]);

    return (
        <div className='text-center flex flex-col'>
            <NavBar />
            <NavCategories />
            <div className='py-5 px-3 w-full'>
                {
                    fetchProduct.map((item) => {
                        const imagesArray = item.images ? item.images.split(",") : [];
                        const percentOff = Math.floor(((item.price - item.discount_price) / item.price) * 100)

                        return (
                            <div className='flex flex-col md:flex-row items-start text-left justify-start w-full gap-5 ' key={item.id}>


                                <div className='md:w-[500px] w-full'>
                                    {/* Main Image Display */}
                                    <div className="md:w-[500px] w-full h-full md:h-[450px] relative overflow-hidden flex items-center justify-center bg-white">
                                        {/* Top wishList icon */}
                                        <div className="absolute -top-3 right-1 cursor-pointer  text-gray-500 text-sm font-semibold px-2 py-3  z-10">
                                            <FavoriteBorderIcon />
                                        </div>
                                        <img
                                            src={mainImage}
                                            alt={item.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    {/* Side Thumbnails */}
                                    <Swiper
                                        modules={[Navigation, Autoplay]}
                                        autoplay={{ delay: 5000 }}
                                        pagination={{ clickable: false }}
                                        spaceBetween={0}
                                        slidesPerView={5}
                                        navigation={false}
                                        className='mySwiper py-5 w-'>
                                        {imagesArray.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <div className='w-20 h-20 cursor-pointer border-blue-400 border p-1'>
                                                    <img
                                                        src={`http://localhost:5000/uploads/${img}`}
                                                        alt={`product-${index}`}
                                                        className='h-full w-full  object-contain'
                                                        onMouseEnter={() => setMainImage(`http://localhost:5000/uploads/${img}`)}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Product Info */}
                                <div className='w-full'>
                                    <p className='text-gray-400'><strong>{item.brand_name}</strong></p>


                                    {/* color */}
                                    <div className="mt-6 sm:mt-8 lg:mt-0">

                                        <div className='my-2 text-sm'>{item.stock === 1 ?
                                            <span className='bg-green-400 px-3 p-1 rounded-md text-green-50'>In stock</span>
                                            :
                                            <span className='bg-red-400 px-3 p-1 rounded-md text-gray-50'>Out Of Stcok</span>}
                                        </div>
                                        <h1 className="md:text-xl text-md font-semibold text-gray-900 sm:text-2xl">
                                            {item.name}
                                        </h1>

                                        <div className="my-3 sm:items-center sm:gap-4 sm:flex">

                                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                                <div className="flex items-center gap-1">
                                                    <svg
                                                        className="w-4 h-4 text-yellow-300"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                        />
                                                    </svg>
                                                    <svg
                                                        className="w-4 h-4 text-yellow-300"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                        />
                                                    </svg>
                                                    <svg
                                                        className="w-4 h-4 text-yellow-300"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                        />
                                                    </svg>
                                                    <svg
                                                        className="w-4 h-4 text-yellow-300"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                        />
                                                    </svg>
                                                    <svg
                                                        className="w-4 h-4 text-yellow-300"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p
                                                    className="text-sm font-medium leading-none text-gray-500"
                                                >
                                                    (5.0)
                                                </p>
                                                <a
                                                    href="#"
                                                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                                                >
                                                    345 Reviews
                                                </a>
                                            </div>
                                        </div>

                                        <div>
                                            <p className='text-blue-500 font-medium mt-4 mb-1'>Special Price</p>
                                        </div>
                                        <div className='flex items-end gap-2'>
                                            <span className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                                ₹{item.discount_price}
                                            </span>
                                            <span className="text-lg text-gray-500 line-through">₹{item.price}</span>
                                            <span className='text-green-500 font-sans font-medium'>{percentOff}% Off</span>
                                        </div>
                                        <div className="mt-6 flex  items-center gap-2">


                                            <button
                                                className="text-white bg-[#fa664c] sm:mt-0 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 hover:text-gray-700 transition-all duration-300 ease"
                                                role="button"
                                                onClick={handleAddToCart}
                                            >

                                                <AddShoppingCartIcon sx={{ fontSize: { xs: 24, md: 24 } }} />
                                                <span className='mx-2'> Add to cart</span>
                                            </button>

                                            <button
                                                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium hover:text-gray-700 focus:outline-none bg-[#f4c620] text-white rounded-lg border border-gray-200 hover:bg-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all duration-300 ease"
                                                role="button"
                                            >
                                                <ShoppingBagIcon sx={{ fontSize: { xs: 24, md: 24 } }} />
                                                <span className='mx-2'>Buy Now </span>
                                            </button>
                                        </div>

                                        <hr className="my-6 md:my-8 border-gray-200" />

                                        <p className="mb-6 text-gray-500">
                                            {item.description}
                                        </p>

                                        <p className="text-gray-500">
                                            Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                                            Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
                                            Magic Keyboard or Magic Keyboard with Touch ID.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail
