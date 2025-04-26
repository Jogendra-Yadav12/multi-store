import React from 'react'
import { NavLink } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const HeadingTag = ({title='Page Title', path='Current Path'}) => {


  return (
    <div className='flex justify-between items-center rounded shadow-md border p-4'>
        <div>
            <h1 className='text-xs md:text-xl font-bold text-indigo-700'>{title}</h1>
        </div>

        <div className='flex items-center gap-1'>
                <NavLink to='/' className='text-xs md:text-lg font-semibold hover:text-blue-600 text-gray-600'>Dashboard</NavLink><span><KeyboardArrowRightIcon color='disabled'/></span>
                <p className='text-gray-500 md:text-base font-semibold text-xs'>{path}</p>
        </div>
    </div>
  )
}

export default HeadingTag