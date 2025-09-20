import React, { useState } from 'react'
import DeliveryAddress from '../../layout/address/DeliveryAddress'
import { useAddressApi } from '../../../../context/address/AddressApiContaxt'
import { useAuth } from '../../../../context/AuthContext'
import UpdateAddress from '../../layout/address/UpdateAddress'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { red } from '@mui/material/colors';

const UserAddress = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null); // jis address ko update karna hai

    const { getAddress, deleteAddress } = useAddressApi()
    const { user } = useAuth()

    const handleDelete = (id) => {
        if (window.confirm("Are You sure you want to delete this address?"));
        deleteAddress(id, user.id)
    }



    return (
        <div>
            <DeliveryAddress />

            {Array.isArray(getAddress) && getAddress.length > 0 ? (
                getAddress
                    .map((items) => (
                        <div key={items.id} className="p-5 mb-2 w-full bg-white border border-gray-200 rounded-2xl lg:p-6 shadow-lg">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className='w-full'>
                                    <p className='mb-1'>
                                        {items.name}
                                        <span className='bg-gray-200 px-2 text-gray-500 rounded'>Home</span>
                                        <span className='px-2'>{user.number}</span>
                                    </p>
                                    <address className='text-gray-600 text-sm lg:text-lg'>
                                        {items.address} <span className='px-2 text-gray-900'>{items.postal_code}</span>
                                    </address>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <button onClick={() => handleDelete(items.id)} className="flex w-full items-center justify-center gap-2 rounded-full border border-red-500 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-100 hover:text-gray-800">
                                        <DeleteIcon sx={{ color: red[500] }} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedId(items.id);
                                            setShowModal(true);
                                        }}
                                        className="flex w-full items-center justify-center gap-2 rounded-full border border-blue-500 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        <CreateIcon color="primary" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
            ) : (
                <p className='text-lg text-red-600'>No Address Found</p>
            )}

            {/* Pass state and id as props */}
            <UpdateAddress
                showModal={showModal}
                setShowModal={setShowModal}
                id={selectedId}
            />
        </div>
    )
}

export default UserAddress
