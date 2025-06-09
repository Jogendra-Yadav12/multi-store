import React, { useEffect, useState } from 'react'
import Footer from '../layout/Footer'
import NavBar from '../layout/NavBar'
import NavCategories from '../layout/NavCategories'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';

const ProductDetail = () => {
    const { id } = useParams()
    const [fetchProduct, setFetchProducts] = useState([]);

    useEffect(() => {

        if (id) {
            axios.get(`http://localhost:5000/api/product/${id}`)
                .then((res) => {
                    setFetchProducts([res.data]);  // Array me wrap karo taaki map chale
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
                        const firstImage = imagesArray.slice(0, 1)[0]
                        const percentOff = Math.floor(((item.price - item.discount_price) / item.price) * 100)
                        {/* console.log(firstImage) */ }
                        return (
                            <div className='flex items-start text-left justify-start w-full gap-5 ' key={item.id}>
                                <div className='w-36 flex items-center flex-col gap-2'>
                                    {
                                        imagesArray.map((img, index) => (
                                            <img src={`http://localhost:5000/uploads/${img}`} key={index} alt={`product-${index}`} className='w-16 h-16 object-cover cursor-pointer border-blue-400 border  p-1 ' />
                                        ))
                                    }
                                </div>
                                <div className="w-[650px] h-[500px] overflow-hidden flex items-center justify-center shadow-lg bg-white">
                                    <img
                                        src={`http://localhost:5000/uploads/${firstImage}`}
                                        alt={item.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>

                                <div className='w-full'>
                                    <p className='text-gray-400'><strong>{item.brand}</strong></p>
                                    <h1 className='text-2xl leading-10 text-gray-800 font-medium'>{item.name}</h1>
                                    <p className='text-blue-500 font-medium'>Special Price</p>
                                    <div className="flex gap-3 items-end mt-1">
                                        <span className="text-3xl font-semibold text-black">₹{item.discount_price}</span>
                                        <span className="text-lg text-gray-500 line-through">₹{item.price}</span>

                                        <span className='text-green-500 font-sans font-medium'>{percentOff}% Off</span>
                                    </div>
                                    <div className='my-5 text-white flex items-center gap-3'>
                                        <span className='w-16 h-8 justify-center flex items-center bg-blue-600  rounded-full gap-1'>4.0 <StarIcon sx={{ fontSize: 16 }}/></span><span className='text-gray-500'>4 ratings and 0 reviews</span>
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