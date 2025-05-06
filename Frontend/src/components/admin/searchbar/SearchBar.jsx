import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const SearchBar = ({path='current path'}) => {

    
    return (
        <div className='flex gap-3 items-center justify-between w-full'>
            <div>
                <form className='mx-w-xl p-2 w-full md:h-14 flex items-center bg-white border border-gray-500/20 rounded'>
                    <SearchIcon color='disabled' className='' />
                    <input  type='text' placeholder='Serach for here....' className='w-full h-full outline-none text-gray-500/800 mx-2' />
                </form>
            </div>
            <div>
                <NavLink to='/admin/add-category'>
                    
                    <button className='bg-indigo-600 text-white px-3 py-2 rounded flex items-center gap-1'><AddIcon /> <span className='text-sm md:text-lg max-sm:hidden'>{path}</span></button>
                </NavLink>
                
            </div>
        </div>
    )
}

export default SearchBar