import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Categories = () => {

    const [Categories, setCategories] = useState([]);
  

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories');
                const data = res.data;
                // console.log('Fetched categories:', data);

                const onlyParents = data.filter(cate => cate.parent_id === 0);
                setCategories(onlyParents);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);





    return (
        <div className='w-full mx-auto px-2 md:px-6 lg:px-12 py-4'>
            <div className='text-left text-gray-600 border-b border-gray-300 py-2'>
                <h1 className='text-2xl'>Shop From <span className='text-blue-600 font-semibold'>Top Categories</span></h1>
            </div>

            <div className='flex w-full items-center gap-5 py-5 overflow-y-hidden scroll'>
                {
                    Categories.map((cate) => (
                        <NavLink to={`/category-list/${cate.id}`} key={cate.id} >
                            <div className="flex items-center flex-col w-32 h-32 border p-5 md:p-4 md:w-40 md:h-40 cursor-pointer rounded-full overflow-hidden shadow-md text-center bg-gray-50 hover:border-amber-500 transition-all duration-100 ease-in">

                                <img src={`http://localhost:5000/uploads/${cate.image}`} alt={cate.name} className="h-16 w-16 md:w-24 md:h-24 mx-auto mb-2 rounded-full object-cover" />
                                <p className="text-xs md:text-xs">{cate.name}</p>

                            </div>
                        </NavLink>

                    ))
                }
            </div>
        </div>
    )
}

export default Categories