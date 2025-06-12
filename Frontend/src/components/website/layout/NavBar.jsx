import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, } from 'react-router-dom'
import { assets } from '../../../assets/assets'
import SearchBar from './SearchBar'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NavBar = () => {


    const { user } = useAuth()
    const { logoutCustomer } = useAuth()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false);


    const [isSticky, setSticky] = useState(false);

    // menu 

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    const handleLogout = () => {
        logoutCustomer();
        toast.success("Logged out");
        navigate('/');


    }

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 100) {
            setSticky(true)
        } else {
            setSticky(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.addEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <div className={`${isSticky ? 'fixed top-0 left-0 w-full shadow-md z-50 bg-white/50' : ''} flex items-center w-full justify-between backdrop-blur-sm  gap-2 md:gap-10 px-2 md:px-6 lg:px-12 py-1 pt-1 border-b border-gray-200 transition-all duration-500 ease`}>
                <div className='w-full'>
                    <img onClick={() => navigate('/')} src={assets.logo} alt='Logo' className='w-52 cursor-pointer ' />
                </div>
                <div className='w-full'>
                    <SearchBar />
                </div>
                <div className='w-full flex items-center justify-end gap-2 md:gap-5 font-medium text-gray-500'>
                    <div className='flex items-center gap-1 relative group'>
                        {
                            user ? (
                                <div className="cursor-pointer relative">
                                    <div className='flex flex-col gap-0 items-center md:gap-2  md:flex-row'>
                                        <PersonIcon sx={{ fontSize: { xs: 25, md: 30, }, color: '#3FA8E9' }} />
                                        <div className='leading-3 flex items-center gap-1'>
                                            <p className='text-sm md:text-lg hidden md:block'>Hello</p>
                                            <p><i className='text-blue-400 hidden md:block text-xs md:text-lg'>{user.f_name}</i></p>
                                        </div>
                                    </div>

                                    {/* Dropdown */}
                                    <div className="absolute hidden md:block top-0 left-0">
                                        <div className='mt-10 text-gray-500 bg-white shadow-lg border rounded px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50 min-w-[180px] text-left'>
                                            <NavLink to="/my-profile">
                                                <p className='pb-2 hover:text-blue-500'>My Profile</p>
                                            </NavLink>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left hover:text-red-600"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <NavLink to="/login" className="flex items-center gap-2">
                                    <PersonIcon sx={{ color: '#3FA8E9', fontSize: { xs: 25, md: 30, } }} />
                                    <span className='hidden md:block'>Sign Up/Sign In</span>
                                </NavLink>
                            )
                        }
                    </div>

                    <div className='h-6 w-px  md:block bg-gray-300'></div>
                    <div className='flex items-center gap-2'>
                        <ShoppingCartOutlinedIcon sx={{ color: '#3FA8E9', fontSize: { xs: 24, md: 30 } }} /><span className='hidden lg:block'>Cart</span>
                    </div>
                    <div className='h-6 w-px bg-gray-300 hidden md:block'></div>
                    <div className='lg:flex items-center gap-2 hidden md:block'>
                        <StorefrontOutlinedIcon sx={{ color: '#3FA8E9', fontSize: { xs: 24, md: 30 } }} /><span className='hidden lg:block'>Become a Seller</span>
                    </div>
                    <div className='h-6 w-px xl:hidden md:hidden bg-gray-300'></div>
                    <div className='md:hidden '>
                        <MenuOpenIcon sx={{ color: '#3FA8E9', fontSize: { xs: 28, md: 30, } }} onClick={toggleMenu} />
                    </div>


                </div>


            </div>
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    onClick={closeMenu}
                ></div>
            )}

            <div className={`fixed top-0 left-0 w-80 h-screen text-left text-white z-50 transition-transform duration-500 ease-in-out px-4
    ${menuOpen ? 'translate-x-0' : '-translate-x-full'} 
    backdrop-blur-sm bg-black/80 shadow`}>

                <div className='flex items-center justify-end p-2'>
                    <CloseIcon color="primary" onClick={closeMenu} />
                </div>

                {
                    user ? (
                        <NavLink to="/my-profile">
                            <div className='flex fixed top-3 left-3 items-center gap-2'>
                                <div className='flex items-center border rounded-full p-1'>
                                    <PersonIcon sx={{ fontSize: { xs: 20, md: 30, }, color: '#3FA8E9' }} />
                                </div>
                                <div className='leading-3 flex items-center gap-1'>
                                    <p className='text-md'>Hello</p>
                                    <p className='text-blue-400 text-md'>{user.f_name}</p>
                                </div>
                            </div>
                        </NavLink>
                    ) : (
                        <NavLink to="/login" className="flex fixed top-3 left-3 items-center gap-2">
                            <div className='flex items-center border rounded-full p-1'>
                                <PersonIcon sx={{ fontSize: { xs: 20, md: 30, }, color: '#3FA8E9' }} />
                            </div>
                            <span className=''>Sign Up/Sign In</span>
                        </NavLink>
                    )
                }

                <div className='flex fixed bottom-12 items-center gap-2 '>
                    <StorefrontOutlinedIcon sx={{ color: '#3FA8E9', fontSize: { xs: 24, md: 30 } }} /><span className=''>Become a Seller</span>
                </div>
                <div className='flex fixed bottom-3 items-center gap-2 '>
                    <div className="flex items-center">
                        <button onClick={handleLogout} className='text-red-500 flex items-center gap-2 hover:opacity-50'><ExitToAppIcon /> <span className='text-white'>LogOut</span></button>
                    </div>
                </div>
                <ul className="mt-5">
                    <li className="py-1 cursor-pointer">Home</li>
                    <li className="py-1 cursor-pointer">About</li>
                    <li className="py-1 cursor-pointer">Contact</li>
                </ul>
            </div>

        </>
    )
}

export default NavBar