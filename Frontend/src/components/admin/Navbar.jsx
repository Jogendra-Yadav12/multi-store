import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // ✅ Navigation hook
  const {user} = useAuth()

  const handleLogout = () => {
  logout();
  toast.success("Logged out");
  navigate('login');
};

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3'>
      <div>
        <Link to='/'>
          <img src='http://localhost:5000/uploads/logo/logo.gif' alt='Logo' className='w-28 lg:w-20 h-30' />
        </Link>
      </div>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>{user?.f_name}</p>
        <img src={assets.profile_img} className='max-w-8' alt="Profile" />
        <button onClick={handleLogout} className='flex items-center gap-2 text-red-400 font-medium  border-red-400  p-2 rounded-lg hover:shadow-inner shadow transition-all'><span>Logout</span> <LogoutIcon/></button>
      </div>
    </div>
  );
};

export default Navbar;
