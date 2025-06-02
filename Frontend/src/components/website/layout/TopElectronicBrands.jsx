import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { NavLink } from 'react-router-dom'

const TopElectronicProducts = () => {
  return (
    <div className='w-full mx-auto px-12 py-4'>
        <div className='flex justify-between items-center text-gray-600 border-b border-gray-300 py-2'>
                <h1 className='text-2xl'>Top <span className='text-blue-600 font-semibold'>Electronic Brands</span></h1>
                <NavLink to="" className="flex items-center">View All <KeyboardArrowRightIcon color="primary" m /></NavLink>
            </div>
    </div>
  )
}

export default TopElectronicProducts