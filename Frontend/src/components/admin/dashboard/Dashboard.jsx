import React, { useEffect, useState } from 'react';
import { assets } from '../../../assets/assets';
import axios from 'axios';

const Dashboard = () => {
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);



  useEffect(() => {
    // get category count
    axios.get(`http://localhost:5000/api/categories`)
      .then(res => {

        setCategoryCount(res.data.length);
      })
      .catch(err => {
        console.error('API error:', err);
        setCategoryCount(0);  // Fallback in case of an error
      });

    // get product count
    axios.get(`http://localhost:5000/api/product`)
      .then(res => {

        setProductCount(res.data.length);
      })
      .catch(err => {
        console.error('API error:', err);
        setProductCount(0);  // Fallback in case of an error
      });



  }, []);

  return (
    <div className='min-h-screen bg-indigo-50 flex flex-col items-start justify-between md:p-6 md:pb-0 p-4 pt-6 pb-0'>
      <div className='p-4 rounded-2xl w-full border border-gray-300 bg-gray-50'>
        <h3 className="text-lg pb-6 font-semibold text-gray-800">Overview</h3>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4'>
          <div className='flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-5 md:p-6'>
            <img src={assets.patients_icon} alt='patients icons' />
            <div>
              <p>Active Users</p>
            </div>
          </div>
          <div className='flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-5 md:p-6'>
            <img src={assets.product} className='w-14' alt='patients icons' />
            <div>
              <p className='flex items-center gap-3'>Product  <span className='text-lg text-red-600'>{productCount}</span></p>
            </div>
          </div>
          <div className='flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-5 md:p-6'>
            <img src={assets.category} className='w-14' alt='patients icons' />
            <div>
              <p className='flex items-center gap-3'>Category <span className='text-lg text-red-600'>{categoryCount}</span></p>
            </div>
          </div>
          <div className='flex items-center gap-3 rounded-2xl border border-gray-300 bg-white p-5 md:p-6'>
            <img src={assets.orders} className='w-14' alt='patients icons' />
            <div>
              <p>Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
