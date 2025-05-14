import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // ✅ Navigation hook
  const {user} = useAuth()

  const handleLogout = () => {
  logout();
  toast.success("Logged out");
  navigate('/admin/login');
};

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3'>
      <div>
        <Link to='/'>
          <img src={assets.logo} alt='Logo' className='w-28 lg:w-22' />
        </Link>
      </div>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <b>{user?.f_name}</b>
        <img src={assets.profile_img} className='max-w-8' alt="Profile" />
        <button onClick={handleLogout} className='text-red-500 font-medium border border-red-400  p-2 rounded-lg hover:shadow-inner shadow transition-all'>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
