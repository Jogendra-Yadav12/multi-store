import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../../../assets/assets'
import SearchBar from './SearchBar'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

const NavBar = () => {

    const navigate = useNavigate()
    return (
        <div className='flex items-center w-full justify-between gap-10 px-12 py-1 pt-1 border-b border-gray-200'>
            <div className='w-full'>
                <img onClick={() => navigate('/')} src={assets.logo} alt='Logo' className='w-52 cursor-pointer' />
            </div>
            <div className='w-full'>
                <SearchBar />
            </div>
            <div className='w-full flex items-center gap-5 font-medium text-gray-500'>
                <div className='flex items-center gap-1'>
                    <NavLink to="/login">
                        <PersonIcon sx={{ color: '#3FA8E9', fontSize: 30 }} /> <span>Sign Up/Sign In</span>
                    </NavLink>
                </div>
                <div className='h-6 w-px bg-gray-300'></div>
                <div className='flex items-center gap-1'>
                    <ShoppingCartOutlinedIcon sx={{ color: '#3FA8E9', fontSize: 30 }} /><span>Cart</span>
                </div>
                <div className='h-6 w-px bg-gray-300'></div>
                <div className='flex items-center gap-1'>
                    <StorefrontOutlinedIcon sx={{ color: '#3FA8E9', fontSize: 30 }} /><span>Become a Seller</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar