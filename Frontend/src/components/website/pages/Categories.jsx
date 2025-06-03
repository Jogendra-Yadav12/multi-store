import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';

const Categories = () => {

    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories');
                const data = res.data;
                // console.log('Fetched categories:', data);

                const onlyParents = data.filter(cate => !cate.parent_id);
                setCategories(onlyParents);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, []);





    return (
        <div className='w-full mx-auto px-12 py-4'>
            <div className='flex justify-between items-center text-gray-600 border-b border-gray-300 py-2'>
                <h1 className='text-2xl'>Shop From <span className='text-blue-600 font-semibold'>Top Categories</span></h1>
                <NavLink to="" className="flex items-center">View All <KeyboardArrowRightIcon color="primary" /></NavLink>
            </div>

            <div className='flex items-center gap-5 py-5'>
                {
                    Categories.map((cate) => (
                        <div key={cate.id} className="border p-4 w-40 h-40 cursor-pointer rounded-full overflow-hidden shadow-md text-center bg-gray-50 hover:border-amber-500 transition-all duration-100 ease-in">
                            <img src={`http://localhost:5000/uploads/${cate.image}`} alt={cate.name} className="h-24 w-24 mx-auto mb-2 rounded-full object-cover" />
                            <p className="text-xs">{cate.name}</p>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default Categories