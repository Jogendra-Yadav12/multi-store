import React, { useEffect, useState } from 'react'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../layout/ProductCard'
import NavCategories from '../layout/NavCategories'
import FilterSidebar from '../layout/FilterSidebar'

const ProductListByCategory = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setProducts([]);
        setLoading(true);
        if (id) {
            axios.get(`http://localhost:5000/api/productCategory/${id}`)
                .then((res) => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error Fetching Products", err);
                    setLoading(false);
                });
        }

    }, [id]);


    return (
        <div className='flex flex-col items-center text-center'>
            <NavBar />
    
                 <NavCategories />
    

            <div className='w-full mx-auto px-2 md:px-6 lg:px-12 flex justify-between items-center text-gray-600 border-b border-gray-300 py-6'>
                <h1 className='text-3xl font-semibold'>Explore <span className='text-blue-600'>This Category</span></h1>
            </div>

            <div className='flex items-start w-full bg-indigo-100'>
                <div className=''>
                    <FilterSidebar categoryId={id} />
                </div>

                <div className='w-full'>
                    {loading ? (
                        <div className="w-full text-center py-8 text-blue-600 font-semibold text-3xl">
                            Loading products...
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 py-2 p-2'>
                            {
                                products.length === 0 ? (
                                    <div className="w-full col-span-full text-center text-lg text-red-500 font-semibold">
                                        No Products Found in This Category.
                                    </div>
                                ) : (
                                    products.map((pitems) => (
                                        <NavLink to={`/product-detail/${pitems.id}`} key={pitems.id} >
                                            <ProductCard product={pitems} />
                                        </NavLink>
                                    ))
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductListByCategory;
