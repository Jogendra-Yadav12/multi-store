import React from 'react'
import { NavLink } from 'react-router-dom';
// import { assets } from '../../../assets/assets';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';

const Sidebar = () => {

  const menuItems =  [
    {name: 'Dashboard', path: 'dashboard', icon: <DashboardIcon color="primary"/> },
    {name: 'Category', path: 'view-category', icon: <AddIcon color="primary"/> },
    {name: 'Product', path: 'view-products', icon: <AddIcon color="primary"/> },
    
    {name: 'Brand', path: 'view-brands', icon: <AddIcon color="primary"/> },
    {name: 'Payment Method', path: 'payment-method', icon: <AddIcon color="primary"/> },
    {name: 'Customer', path: 'view-customer', icon: <PersonIcon color="primary"/> },
    {name: 'Order List', path: 'order-list', icon: <PersonIcon color="primary"/> },
    {name: 'My Profile', path: 'profile', icon: <AccountBoxIcon color="primary"/> },

    
  ];
  return (
    <div className='md:w-60 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col'>   
        {menuItems.map((item) => (
          <NavLink to={item.path} key={item.name} end={item.path === '/admin'} 
          className={({isActive}) => `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-5 px-4 gap-3 ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}>
              <span> {item.icon}</span>
              <p className='md:block hidden text-center'>{item.name}</p>
          </NavLink>
        ))}
    </div>
  )
}

export default Sidebar