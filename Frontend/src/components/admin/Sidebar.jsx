import React from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {

  const menuItems =  [
    {name: 'Dashboard', path: 'dashboard', icon: assets.home_icon },
    {name: 'Category', path: 'view-category', icon: assets.add_icon },
    {name: 'Product', path: 'view-products', icon: assets.add_icon },
    {name: 'Customer', path: 'view-customer', icon: assets.add_icon },
    {name: 'My Profile', path: 'profile', icon: assets.user_icon },
    
  ];
  return (
    <div className='md:w-60 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col'>   
        {menuItems.map((item) => (
          <NavLink to={item.path} key={item.name} end={item.path === '/admin'} 
          className={({isActive}) => `flex items-cente md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-5 px-4 gap-3 ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}>
              <img src={item.icon} alt='' className='w-6 h-6'/>
              <p className='md:block hidden text-center'>{item.name}</p>
          </NavLink>
        ))}
    </div>
  )
}

export default Sidebar