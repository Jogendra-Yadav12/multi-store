import React from 'react'
import HeadingTag from '../HeadingNav'
import { assets } from '../../../assets/assets'
import CreateIcon from '@mui/icons-material/Create';

const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
      <HeadingTag title="Profile" path="Profile" />

      <div className='w-full h-full border-2 border-gray-300 rounded-lg md:p-5 p-3 shadow'>
        <div className='flex flex-col lg:flex-row items-center justify-between '>
          <div className='flex flex-col lg:flex-row items-center gap-5 pb-5 md:pb-0'>
            <div className='w-26 h-full overflow-hidden p-1 object-cover border border-gray-400 rounded-full'>
              <img src={assets.profile_img} className='cursor-pointer' />
            </div>
            <div className="w-full">
              <div className="max-w-md mx-auto md:mx-0 text-center md:text-left">
                <h4 className="mb-2 text-lg font-semibold text-gray-800">Jogendra Yadav</h4>
                <p className="text-base text-gray-500">Seller</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row items-center gap-5 md:mt-0'>
            <div className='flex items-center gap-4 md:gap-3 mt-3 lg:mt-0 max-md:mt-0'>
              <a href='#'>
                <img src={assets.facebook_icon} className='w-12 h-12' alt='facebook icon' />
              </a>
              <a href='#'>
                <img src={assets.twitter_icon} className='w-12 h-12' alt='twitter icon' />
              </a>
              <a href='#'>
                <img src={assets.instagram_icon} className='w-12 h-12' alt='instagram icon' />
              </a>
            </div>
            <button className="flex w-full md:text-lg items-center justify-center gap-2 rounded-full border border-gray-600 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 lg:inline-flex lg:w-auto"><CreateIcon sx={{ fontSize: 18 }} /> Edit</button>
          </div>
        </div>
        <div></div>
        <div></div>

      </div>

      <div className='flex flex-col gap-3 md:flex-row'>
        <div className='w-full h-full border-2 border-gray-300 rounded-lg md:p-5 p-3 shadow'>
          <div className=''>
            <h4 className="mb-2 text-lg font-semibold text-gray-800">Personal Information</h4>
            <div className='mt-4'>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32"><div>
                <p className="mb-2 text-xs leading-normal text-gray-500">First Name</p>
                <p className="text-sm font-medium text-gray-800 ">Jogendra</p>
              </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">Last Name</p>
                  <p className="text-sm font-medium text-gray-800">Yadav</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Email address</p>
                  <p className="text-sm font-medium text-gray-800">jogendra@seller.com</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Phone</p><p className="text-sm font-medium text-gray-800">+09 363 398 46</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className='w-full h-full border-2 border-gray-300 rounded-lg md:p-5 p-3 shadow'>
          <div className='flex items-start justify-between'>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 lg:mb-4">Address</h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32"><div>
                <p className="mb-2 text-xs leading-normal text-gray-500">Country</p>
                <p className="text-sm font-medium text-gray-800">Uttar Pradesh.</p>
              </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">City/State</p>
                  <p className="text-sm font-medium text-gray-800">Farrukhabad, Uttar Pradesh</p></div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">Postal Code</p>
                  <p className="text-sm font-medium text-gray-800">208012</p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500">TAX ID</p>
                  <p className="text-sm font-medium text-gray-800">JY4568384</p></div>
              </div>
            </div>

            <div>
              <button className="flex w-full md:text-lg items-center justify-center gap-2 rounded-full border border-gray-600 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 lg:inline-flex lg:w-auto"><CreateIcon sx={{ fontSize: 18 }} /> Edit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile