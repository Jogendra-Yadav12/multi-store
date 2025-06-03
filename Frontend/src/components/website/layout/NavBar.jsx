import React from 'react'
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
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        toast.success("Logged out");
        navigate('/');
    }

    return (
        <div className='fixed backdrop-blur-md bg-white/40 z-10 flex items-center w-full justify-between gap-10 px-12 py-1 pt-1 border-b border-gray-200'>
            <div className='w-full'>
                <img onClick={() => navigate('/')} src={assets.logo} alt='Logo' className='w-52 cursor-pointer' />
            </div>
            <div className='w-full'>
                <SearchBar />
            </div>
            <div className='w-full flex items-center gap-5 font-medium text-gray-500'>
                <div className='flex items-center gap-1 relative group'>
                    {
                        user ? (
                            <div className="cursor-pointer flex items-center gap-1 relative">
                                <PersonIcon sx={{ fontSize: 30, color: '#3FA8E9' }} />
                                <span className='text-sm'>Hello <br /><i className='text-blue-400'>{user.f_name}</i></span>

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
                            <NavLink to="/login" className="flex items-center gap-1">
                                <PersonIcon sx={{ color: '#3FA8E9', fontSize: 30 }} />
                                <span>Sign Up/Sign In</span>
                            </NavLink>
                        )
                    }
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