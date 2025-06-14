import React from 'react'
import { red } from '@mui/material/colors';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HeadingTag from '../layout/HeadingNav';
import SearchBar from '../searchbar/SearchBar';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const BrandList = () => {

    const [fetchBrand, setFetchBrand] = useState([])
    const navigate = useNavigate()

    const fetchBrands = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/getbrand');
            setFetchBrand(res.data);
        } catch (err) {
            console.error("Brand api Error:", err);
        }
    }
    useEffect(()=>{
        fetchBrands();
    })


    const editBrand = (id) => {
        navigate(`/edit-brand/${id}`);
    }

    const deleteBrand = async (id) => {
        if(window.confirm("Are you sure you want to delete this Brand")){
            try{
               const res = await axios.delete(`http://localhost:5000/api/brand/${id}`)
                toast.error(res.data.message);
                fetchBrands();
            }catch(err){
                console.error("delete api error:", err);
                 toast.error("Failed to delete Brand.");
            }
        }
    }
    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title='Brands' path='brands' />
            <SearchBar path='Add' to='/add-brands' />

            <table className='md:table-auto table-fixed w-full overflow-hidden'>
                <thead className='bg-indigo-100 text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                    <tr>
                        <th className='px-3 py-3 font-semibold truncate'>S.No</th>
                        <th className='px-2 py-3 font-semibold truncate'>Brand Name</th>
                        <th className='px-2 py-3 font-semibold truncate'>Status</th>

                        {/* <th className='px-3 py-3 font-semibold truncate'>Meta Title </th>
                        <th className='px-3 py-3 font-semibold truncate'>Meta Description</th> */}
                        {/* <th className='px-3 py-3 font-semibold truncate'>Description</th> */}

                        <th className='px-3 py-3 font-semibold truncate'>Action</th>
                    </tr>
                </thead>

                <tbody className='text-gray-700 text-left'>
                    {
                        fetchBrand.map((item, index) => (
                            <tr key={item.id} className='border-b border-gray-500/20'>
                                <td className='px-2 py-3'>
                                    {index + 1}
                                </td>
                                <td className='px-2 py-3'>
                                    {item.name}
                                </td>
                                <td className='px-2 py-3'>
                                {item.status === 1 ? "Active" : "Disabled"}
                                </td>

                                <td className='px-3'>
                                    <div className='flex items-center justify-start gap-2'>
                                        <CreateIcon className='cursor-pointer' onClick={() => editBrand(item.id)} sx={{ fontSize: 25 }} color="primary" fontSize="large" />

                                        <DeleteForeverIcon className='cursor-pointer' onClick={() => deleteBrand(item.id)} sx={{ color: red[500], fontSize: 25 }} fontSize="large" />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    )
}

export default BrandList