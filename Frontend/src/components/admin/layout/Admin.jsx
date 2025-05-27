import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Admin = () => {
    return (
        <>
            <div className='text-default min-h-screen bg-white'>
                <Navbar />
                <div className='flex'>
                    <Sidebar />
                    <div className='flex-1'>
                        {<Outlet />}
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Admin