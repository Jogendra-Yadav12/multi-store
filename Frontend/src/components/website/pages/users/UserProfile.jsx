import NavBar from '../../layout/NavBar'
import Footer from '../../layout/Footer'
import NavCategories from '../../layout/NavCategories'
import { assets } from '../../../../assets/assets'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserInfo from './UserInfo'
import UserAddress from './UserAddress'
import { useState } from 'react'


const UserProfile = () => {
    const { user } = useAuth();
    const {logoutCustomer} = useAuth()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('user-info')

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
                <div className='flex items-start gap-4'>
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
                            <button onClick={() => setActiveTab('user-info')} className={`w-full bg-white p-5 mb-2 border border-gray-200 rounded-2xl lg:p-4 text-left ${activeTab === 'user-info' ? 'text-blue-600 border-blue-500' : ''}`}>
                                Personal Information
                            </button>

                            <button onClick={() => setActiveTab('user-address')} className={`w-full bg-white p-5 mb-2 border border-gray-200 rounded-2xl lg:p-4 text-left ${activeTab === 'user-address' ? 'text-blue-600 border-blue-500' : ''}`}>
                                Address Information
                            </button>
                         
                            <div className="w-full bg-white p-5 mb-2 border border-gray-200 rounded-2xl lg:p-4">
                                <div className="flex items-center">
                                    <button onClick={handleLogout} className='text-red-500 flex items-center gap-2 hover:opacity-50'>LogOut <ExitToAppIcon/></button>
                                </div>
                            </div>
                        </div>
                    
                    </div>


                        <div className='w-full'>
                            {activeTab === 'user-info' && (
                                <UserInfo/>
                            )}

                            {activeTab === 'user-address' && (
                                <UserAddress/>
                            )}
                        </div>


                    

                </div>


            </div>

            <Footer />
        </div >
    )
}

export default UserProfile
