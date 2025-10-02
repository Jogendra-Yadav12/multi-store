import React from 'react'
import { useAddressApi } from '../../../../context/address/AddressApiContaxt'
import { useAuth } from '../../../../context/AuthContext';

const AddressCard = ({ selectedAddress, setSelectedAddress, onDeliveryHere }) => {
    const { getAddress } = useAddressApi();
    const { user } = useAuth()

    return (
        <>
            {Array.isArray(getAddress) && getAddress.length > 0 ? (
                getAddress.map((address) => (
                    // Show only selectedAddress if exists, else show all
                    (!selectedAddress || selectedAddress.id === address.id) && (
                        <div key={address.id} className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-4 mb-5'>
                            <div className="flex items-start gap-5">
                                <input
                                    id="address"
                                    type="radio"
                                    name="first-add"
                                    value="address"
                                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 mt-1"
                                    checked={selectedAddress?.id === address.id}
                                    onChange={() => setSelectedAddress(address)}
                                />
                                <div>
                                    <p className='mb-1'>
                                        {address.name} <span className='bg-gray-200 px-2 text-gray-500 rounded mx-2'>Home</span> <span>{user.number}</span>
                                    </p>
                                    <address className='text-sm lg:text-lg'>{address.address} <span>{address.postal_code}</span></address>

                                    {selectedAddress?.id === address.id && (
                                        <div className='mt-3 text-xs md:text-lg'>
                                            <button
                                                onClick={onDeliveryHere}
                                                className="bg-yellow-400 px-3.5 py-1.5 rounded"
                                            >
                                                Delivery Here
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                ))
            ) : (<p className='text-lg text-red-600'>No Address Found</p>)}
        </>
    )
}

export default AddressCard
