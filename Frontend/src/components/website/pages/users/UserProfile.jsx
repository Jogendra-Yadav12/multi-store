import React from 'react'
import NavBar from '../../layout/NavBar'
import Footer from '../../layout/Footer'
import NavCategories from '../../layout/NavCategories'
import { assets } from '../../../../assets/assets'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const UserProfile = () => {
    const { user } = useAuth();
    const {logoutCustomer} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutCustomer();
        toast.success("Logged out")
        navigate("/")
    }

    return (
        <div className='text-center'>
            <NavBar />
            <NavCategories />
            <div className='p-5 w-full bg-indigo-50 text-left'>
                <div className='flex items-start gap-2'>
                    <div>
                        <div className="w-100 bg-white p-5 mb-2 border border-gray-200 rounded-2xl lg:p-6">
                            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                                <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                                    <div className="w-18 h-18 overflow-hidden border border-gray-200 rounded-full">
                                        <img src={assets.profile_img} alt="user" />
                                    </div>
                                    <div className="order-3 xl:order-2">
                                        <p className='text-gray-500 text-sm'>Hello,</p>
                                        <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 xl:text-left">
                                            {user.f_name} {user.l_name}
                                        </h4>
                                        <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                SabMilega
                                            </p>
                                            <div className="hidden h-3.5 w-px bg-gray-300  xl:block"></div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Customer
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="w-full bg-white p-5 mb-2 border border-gray-200 rounded-2xl lg:p-4">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                    <div className='w-full'>
                                        <h4 className="text-lg font-semibold text-blue-500 lg:mb-6">
                                            Order Information
                                        </h4>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-white p-5 mb-2 border border-gray-200 rounded-2xl lg:p-4">
                                <div className="flex items-center">
                                    <button onClick={handleLogout} className='text-red-500 flex items-center gap-2 hover:opacity-50'>LogOut <ExitToAppIcon/></button>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='w-full'>
                        <div className="w-full bg-white p-5 mb-2 border border-gray-200 rounded-2xl lg:p-6">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className='w-full'>
                                    <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                                        Personal Information
                                    </h4>

                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                                        <div>
                                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                First Name
                                            </p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {user.f_name}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                Last Name
                                            </p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {user.l_name}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                Email address
                                            </p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                Phone
                                            </p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {user.number}
                                            </p>
                                        </div>


                                    </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-100 hover:text-gray-800">

                                        Add
                                    </button>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-100 hover:text-gray-800">

                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 w-full bg-white border border-gray-200 rounded-2xl lg:p-6">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className='w-full'>
                                    <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                                        Address
                                    </h4>

                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                                        <div>
                                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                Country
                                            </p>
                                            <p className="text-sm font-medium text-gray-800">
                                                United States
                                            </p>
                                        </div>

                                        <div>
                                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                City/State
                                            </p>
                                            <p className="text-sm font-medium text-gray-800">
                                                Arizona, United States.
                                            </p>
                                        </div>

                                        <div>
                                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                Postal Code
                                            </p>
                                            <p className="text-sm font-medium text-gray-800">
                                                ERT 2489
                                            </p>
                                        </div>

                                        <div>
                                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                TAX ID
                                            </p>
                                            <p className="text-sm font-medium text-gray-800">
                                                AS4568384
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-100 hover:text-gray-800">

                                        Add
                                    </button>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-100 hover:text-gray-800">

                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

            <Footer />
        </div >
    )
}

export default UserProfile
