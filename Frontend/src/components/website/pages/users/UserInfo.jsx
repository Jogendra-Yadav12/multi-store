import React from 'react'
import { useAuth } from '../../../../context/AuthContext'

const UserInfo = () => {

    const { user } = useAuth()
    return (
        <div>
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

                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo