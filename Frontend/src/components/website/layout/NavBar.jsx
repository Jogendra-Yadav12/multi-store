import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../../../assets/assets'
import SearchBar from './SearchBar'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const NavBar = () => {

    const { user } = useAuth()
    const { logoutCustomer } = useAuth()
    const navigate = useNavigate()


    const [isSticky, setSticky] = useState(false);

    const handleLogout = () => {
        logoutCustomer();
        toast.success("Logged out");
        navigate('/');
        
        
    }

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if(scrollTop > 100){
            setSticky(true)
        }else{
            setSticky(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return() => {
            window.addEventListener('scroll', handleScroll)
        }
    },[])

    return (
        <div className={`${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''} flex items-center w-full justify-between backdrop-blur-md bg-white/40 gap-2 md:gap-10 px-2 md:px-6 lg:px-12 py-1 pt-1 border-b border-gray-200 transition-all duration-500 ease`}>
            <div className='w-full'>
                <img onClick={() => navigate('/')} src={assets.logo} alt='Logo' className=' md:w-52 cursor-pointer' />
            </div>
            <div className='w-full'>
                <SearchBar />
            </div>
            <div className='w-full flex items-center justify-end gap-2 md:gap-5 font-medium text-gray-500'>
                <div className='flex items-center gap-1 relative group'>
                    {
                        user ? (
                            <div className="cursor-pointer flex flex-col md:flex-row gap-0 items-center md:gap-2 relative">
                                <PersonIcon sx={{ fontSize: {xs: 20, md: 30,}, color: '#3FA8E9' }} />
                                <div className='leading-3'>
                                    <p className='text-sm hidden md:block'>Hello</p>
                                    <p><i className='text-blue-400 text-xs md:text-sm'>{user.f_name}</i></p>
                                </div>

                                {/* Dropdown */}
                                <div className="absolute top-10 left-0 bg-white shadow-lg border rounded px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50 min-w-[120px]">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left text-gray-700 hover:text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <NavLink to="/login" className="flex items-center gap-2">
                                <PersonIcon sx={{ color: '#3FA8E9', fontSize: {xs: 20, md: 30,} }} />
                                <span className='hidden md:block'>Sign Up/Sign In</span>
                            </NavLink>
                        )
                    }
                </div>

                <div className='h-6 w-px bg-gray-300'></div>
                <div className='flex items-center gap-2'>
                    <ShoppingCartOutlinedIcon sx={{ color: '#3FA8E9', fontSize: {xs:24, md:30} }} /><span className='hidden md:block'>Cart</span>
                </div>
                <div className='h-6 w-px bg-gray-300'></div>
                <div className='flex items-center gap-2'>
                    <StorefrontOutlinedIcon sx={{ color: '#3FA8E9', fontSize:{xs:24, md:30} }} /><span className='hidden md:block'>Become a Seller</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar