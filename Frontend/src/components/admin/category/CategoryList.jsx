import React, { useEffect, useState } from 'react'
import HeadingTag from '../HeadingNav'
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import SearchBar from '../searchbar/SearchBar';

const CategoryList = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/categories")
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.log('Error fetching categories', err);

            })
    }, [])

    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title="Category Table" path="View Category" />

            <SearchBar path='Add Category' />
            <table className='md:table-auto table-fixed w-full overflow-hidden'>
                <thead className='bg-indigo-100 text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
                    <tr>
                        <th className='px-4 py-3 font-semibold truncate'>Category Name</th>
                        <th className='px-4 py-3 font-semibold truncate'>Status</th>
                        <th className='px-4 py-3 font-semibold truncate'>Meta Title </th>
                        <th className='px-4 py-3 font-semibold truncate'>Meta Description</th>
                        <th className='px-4 py-3 font-semibold truncate'>Description</th>
                        <th className='px-4 py-3 font-semibold truncate'>Category Image </th>
                        <th className='px-4 py-3 font-semibold truncate'>Action</th>
                    </tr>
                </thead>

                <tbody className='text-gray-700'>
                    {categories.map((cat) => (
                        <tr key={cat.id} className='border-b border-gray-500/20'>
                            <td className='px-4 py-3'>
                                {cat.name}
                            </td>
                            <td className='px-4 py-3'>
                                {cat.status}
                            </td>
                            <td className='px-4 py-3 max-sm:hidden'>
                                {cat.meta_title}
                            </td>
                            <td className='px-4 py-3 max-sm:hidden'>
                                {cat.meta_desc}
                            </td>
                            <td className='px-4 py-3 max-sm:hidden'>
                                {cat.description}
                            </td>
                            <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 '>
                                <div className='w-20 h-16 overflow-hidden'>
                                    <img
                                        src={`http://localhost:5000/uploads/${cat.image}`}
                                        alt='Category'
                                        className='w-full h-full object-cover rounded'
                                    />
                                </div>
                            </td>
                            <td className='px-3'>
                                <div className='flex items-center justify-start gap-2'>
                                    <VisibilityIcon className='cursor-pointer' color="primary" fontSize="large" />

                                    <DeleteForeverIcon className='cursor-pointer' sx={{ color: red[500] }} fontSize="large" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default CategoryList