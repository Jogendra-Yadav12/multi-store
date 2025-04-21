import React from 'react'
import { NavLink } from 'react-router-dom'

const HeadingTag = ({title='Page Title', path='Current Path'}) => {


  return (
    <div className='flex  justify-between items-center rounded shadow-md border p-4'>
        <div>
            <h1 className='text-sm md:text-xl font-bold text-indigo-700'>{title}</h1>
        </div>

        <div className='flex items-center gap-1'>
                <NavLink to='/' className='text-sm font-semibold hover:text-blue-600 text-gray-600'>Dashboard</NavLink> <span>/</span>
                <p className='text-gray-600 font-semibold text-sm'>{path}</p>
        </div>
    </div>
  )
}

export default HeadingTag