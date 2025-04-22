import React from 'react'
import { assets } from '../../../assets/assets'

const Dashboard = () => {
  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>
            <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-64 rounded-md'>
                <img src={assets.patients_icon} alt='patients icons' />
                <div>
                  <p>Users</p>
                </div>
            </div>
            <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-64 rounded-md'>
                <img src={assets.patients_icon} alt='patients icons' />
                <div>
                  <p>Product</p>
                </div>
            </div>
            <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-64 rounded-md'>
                <img src={assets.patients_icon} alt='patients icons' />
                <div>
                  <p>Category</p>
                </div>
            </div>
            <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-64 rounded-md'>
                <img src={assets.patients_icon} alt='patients icons' />
                <div>
                  <p>Orders</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard