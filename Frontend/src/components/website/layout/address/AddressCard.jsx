import React from 'react'

const AddressCard = () => {
    return (
        <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-4 mb-5'>

            <div className="flex items-start gap-5 mb-4">
                <input id="address" type="radio" name="first-add" value="address" className ="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 mt-1" defaultChecked />


                <div>
                    <p className='mb-1'>Neeraj Singh <span className='bg-gray-200 px-2 text-gray-500 rounded mx-2'>Home</span> <span>6386567102</span></p>
                    <address >UPSIDA 12a Officer colony kanpur <span>208005</span></address>

                    <div className='my-3'>
                        <button className='bg-[#ffcc18] py-2 px-5 rounded hover:opacity-80'>Delivery Here</button>
                    </div>
                </div>



            </div>


        </div>
    )
}

export default AddressCard