import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import HeadingTag from '../HeadingNav'
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import SearchBar from '../searchbar/SearchBar';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const editCategory = (id) => {
        navigate(`/admin/edit-category/${id}`);
    }

    const fetchCategories = async () => {
      try {
        console.log("new");
        const res = await axios.get("http://localhost:5000/api/categories");
        console.log(res);
        setCategories(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    
    useEffect(() => {
        fetchCategories()
    }, [])


    // delete function
    const deleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category')) {
          try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            toast.error('🗑️ Category deleted successfully!');
      
            // ✅ Re-fetch updated category list
            fetchCategories();
      
          } catch (err) {
            console.error('Delete error:', err);
            toast.error("❌ Failed to delete category.");
          }
        }
      };
      
    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title="Category Table" path="View Category" />

            <SearchBar path='Add Category' />
            <table className='md:table-auto table-fixed w-full overflow-hidden'>
                <thead className='bg-indigo-100 text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
                    <tr>
                        <th className='px-3 py-3 font-semibold truncate'>S.no</th>
                        <th className='px-3 py-3 font-semibold truncate'>Category Name</th>
                        <th className='px-3 py-3 font-semibold truncate'>Status</th>
                        {/* <th className='px-3 py-3 font-semibold truncate'>Meta Title </th>
                        <th className='px-3 py-3 font-semibold truncate'>Meta Description</th> */}
                        <th className='px-3 py-3 font-semibold truncate'>Description</th>
                        <th className='px-3 py-3 font-semibold truncate'>Category Image </th>
                        <th className='px-3 py-3 font-semibold truncate'>Action</th>
                    </tr>
                </thead>

                <tbody className='text-gray-700 text-left'>
                    {categories.map((cat, index) => (
                        <tr key={cat.id} className='border-b border-gray-500/20'>
                            <td className='px-2 py-3'>
                                {index + 1}
                            </td>
                            <td className='px-2 py-3'>
                                {cat.name}
                            </td>
                            <td className='px-10 md:px-4 py-3'>
                                {cat.status}
                            </td>
                            {/* <td className='px-4 py-3 max-sm:hidden'>
                                {cat.meta_title}
                            </td>
                            <td className='px-4 py-3 max-sm:hidden'>
                                {cat.meta_desc}
                            </td> */}
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
                                    <VisibilityIcon className='cursor-pointer' onClick={() => editCategory(cat.id)} sx={{ fontSize: 25 }} color="primary" fontSize="large" />

                                    <DeleteForeverIcon className='cursor-pointer' onClick={() => deleteCategory(cat.id)} sx={{ color: red[500], fontSize: 25 }} fontSize="large" />
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