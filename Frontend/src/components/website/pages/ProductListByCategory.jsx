import React, { useEffect, useState } from 'react'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../layout/ProductCard'
import NavCategories from '../layout/NavCategories';

const ProductListByCategory = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/productCategory/${id}`)
            .then((res) => {
                setProducts(res.data)
                // console.log(res.data);

            })
            .catch((err) => {
                console.error("Error Fetching Products", err);
            })
    })
    return (
        <div className='flex flex-col items-center text-center'>
            <NavBar />
            <NavCategories/>
            <div className='w-full mx-auto px-2 md:px-6 lg:px-12 py-4 '>
                
                <div className='flex justify-between items-center text-gray-600 border-b border-gray-300 py-2'>
                    <h1 className='text-4xl'>Explore <span className='text-blue-600 font-semibold'>All Categories</span></h1>
                    <NavLink to="" className="flex items-center">View All <KeyboardArrowRightIcon color="primary" /></NavLink>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 py-8'>
                    {
                        products.map((pitems) => {
                            return (
                                <ProductCard key={pitems.id} product={pitems} />
                            )
                        })

                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductListByCategory