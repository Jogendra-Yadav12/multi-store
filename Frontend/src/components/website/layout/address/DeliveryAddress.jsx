import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { motion, AnimatePresence } from "framer-motion";

const DeliveryAddress = () => {

    const [activeTab, setActiveTab] = useState(false);



    return (
        <>

            <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-2 shadow-md sm:p-4 mb-4'>
                <div className='cursor-pointer flex items-center gap-2' onClick={() => setActiveTab(!activeTab)}>
                    <AddIcon className='text-blue-500' /> <span className='text-blue-500 text-lg font-medium'>Add New Delivery Address</span>
                </div>
            </div>


            <AnimatePresence>
                {activeTab && (
                    <motion.div

                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden shadow-lg rounded-lg min-w-0 flex-1 border border-gray-200 bg-white p-4 sm:p-6 space-y-8"
                    >
                        <form className="">
                            <div className="space-y-5">
                                {/* <h2 className="text-2xl font-semibold text-gray-600">Add Your Delivery Details</h2> */}

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900"> Your name </label>
                                        <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" required />
                                    </div>

                                    <div>
                                        <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900">mobile number </label>
                                        <input type="number" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" required />
                                    </div>

                                    <div>
                                        <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900"> Pincode </label>
                                        <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" required />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900"> Email </label>
                                        <input type="email" id="email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="name@flowbite.com" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-country-input-3" className="block text-sm font-medium text-gray-900"> State* </label>
                                        </div>
                                        <select id="select-country-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500">
                                            <option>Select state</option>
                                            <option value="AN">Andaman and Nicobar Islands</option>
                                            <option value="AP">Andhra Pradesh</option>
                                            <option value="AR">Arunachal Pradesh</option>
                                            <option value="AS">Assam</option>
                                            <option value="BR">Bihar</option>
                                            <option value="CH">Chandigarh</option>
                                            <option value="CT">Chhattisgarh</option>
                                            <option value="DN">Dadra and Nagar Haveli</option>
                                            <option value="DD">Daman and Diu</option>
                                            <option value="DL">Delhi</option>
                                            <option value="GA">Goa</option>
                                            <option value="GJ">Gujarat</option>
                                            <option value="HR">Haryana</option>
                                            <option value="HP">Himachal Pradesh</option>
                                            <option value="JK">Jammu and Kashmir</option>
                                            <option value="JH">Jharkhand</option>
                                            <option value="KA">Karnataka</option>
                                            <option value="KL">Kerala</option>
                                            <option value="LA">Ladakh</option>
                                            <option value="LD">Lakshadweep</option>
                                            <option value="MP">Madhya Pradesh</option>
                                            <option value="MH">Maharashtra</option>
                                            <option value="MN">Manipur</option>
                                            <option value="ML">Meghalaya</option>
                                            <option value="MZ">Mizoram</option>
                                            <option value="NL">Nagaland</option>
                                            <option value="OR">Odisha</option>
                                            <option value="PY">Puducherry</option>
                                            <option value="PB">Punjab</option>
                                            <option value="RJ">Rajasthan</option>
                                            <option value="SK">Sikkim</option>
                                            <option value="TN">Tamil Nadu</option>
                                            <option value="TG">Telangana</option>
                                            <option value="TR">Tripura</option>
                                            <option value="UP">Uttar Pradesh</option>
                                            <option value="UT">Uttarakhand</option>
                                            <option value="WB">West Bengal</option>
                                        </select>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label htmlFor="select-city-input-3" className="block text-sm font-medium text-gray-900"> City* </label>
                                        </div>
                                        <input type="text" id="city_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" required />
                                    </div>



                                    <div>
                                        <label htmlFor="company_name" className="mb-2 block text-sm font-medium text-gray-900">Landmark (Optional) </label>
                                        <input type="text" id="company_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" />
                                    </div>

                                    <div>
                                        <label htmlFor="vat_number" className="mb-2 block text-sm font-medium text-gray-900"> Alternate number (Optional) </label>
                                        <input type="text" id="number" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" />
                                    </div>


                                </div>

                                <div>
                                    <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900"> Your address </label>
                                    <textarea className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder='type your address here...'>

                                    </textarea>
                                </div>

                                <div className="sm:col-span-2">
                                    <button type="submit" className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">

                                        + Save New Address
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default DeliveryAddress