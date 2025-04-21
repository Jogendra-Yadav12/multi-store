import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3'>
        <div>
        <Link to='/'>
            <img src={assets.logo} alt='Logo' className='w-28 lg:w-22' />
        </Link>
        </div>
        <div className='flex items-center gap-5 text-gray-500 relative'>
            <p>Hi! </p>
            <img src={assets.profile_img} className='max-w-8' />
        </div>
    </div>
  )
}

export default Navbar