import React from 'react'
import { NavLink } from 'react-router-dom'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Categorys = () => {
  return (
    <div className='flex items-center justify gap-5 w-full px-12 py-4 mt-20 border-b border-gray-200'>
        <NavLink className="px-4 py-1 rounded-full text-gray-700 bg-blue-100"><span>Groceries</span>
            <KeyboardArrowDownOutlinedIcon />
        </NavLink>
        <NavLink className="px-4 py-1 rounded-full text-gray-700 bg-blue-100"><span>Fashion & Apparel</span>
            <KeyboardArrowDownOutlinedIcon />
        </NavLink>
        <NavLink className="px-4 py-1 rounded-full text-gray-700 bg-blue-100"><span>Electronics & Gadgets</span>
            <KeyboardArrowDownOutlinedIcon />
        </NavLink>
        <NavLink className="px-4 py-1 rounded-full text-gray-700 bg-blue-100"><span>Home & Kitchen</span>
            <KeyboardArrowDownOutlinedIcon />
        </NavLink>
        <NavLink className="px-4 py-1 rounded-full text-gray-700 bg-blue-100"><span>Beauty</span>
            <KeyboardArrowDownOutlinedIcon />
        </NavLink>
        <NavLink className="px-4 py-1 rounded-full text-gray-700 bg-blue-100"><span>Sports</span>
            <KeyboardArrowDownOutlinedIcon />
        </NavLink>
    </div>
  )
}

export default Categorys