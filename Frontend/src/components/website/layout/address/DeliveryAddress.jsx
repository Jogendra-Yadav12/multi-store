import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { motion, AnimatePresence } from "framer-motion";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useAuth } from "../../../../context/AuthContext";
import { useAddressApi } from "../../../../context/address/AddressApiContaxt";

const DeliveryAddress = () => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();
    const { saveAndUpdateAddress } = useAddressApi()

    const [formData, setFormData] = useState({
        f_name: user?.f_name || "",
        l_name: user?.l_name || "",
        number: user?.number || "",
        email: user?.email || "",
        postal_code: "",
        state: "",
        city: "",
        country: "",
        address: "",
        customer_id: ""
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Final data:", formData);
        const finalData = {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            postal_code: formData.postal_code,
            
        };
        await saveAndUpdateAddress(finalData, user?.id);
        setShowModal(false)
    };

    return (
        <>
            {/* Button to open modal */}
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-2 shadow-md sm:p-4 mb-4">
                <div
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <AddIcon className="text-blue-500" />
                    <span className="text-blue-500 text-sm md:text-lg font-medium">
                        Add New Delivery Address
                    </span>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 p-6 space-y-6 relative"

                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            >
                                <CloseOutlinedIcon />
                            </button>

                            <h2 className="text-2xl font-semibold text-gray-700">
                                Add Your Delivery Details
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="your_name"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >
                                            Your name
                                        </label>
                                        <input type="hidden" value={formData.id} onChange={handleChange} />
                                        <input
                                            type="text"
                                            id="your_name"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                            value={`${formData.f_name} ${formData.l_name}`} onChange={handleChange}
                                            required
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="mobile"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >
                                            Mobile number
                                        </label>
                                        <input
                                            type="number"
                                            id="mobile"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                            value={formData.number} onChange={handleChange}
                                            required
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="pincode"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            id="postal_code"
                                            name="postal_code"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                            value={formData.postal_code || ""} onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                            placeholder="name@gmail.com"
                                            value={formData.email} onChange={handleChange}
                                            required
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="state"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >
                                            State
                                        </label>
                                        <select
                                            id="state"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                            value={formData.state} onChange={handleChange}
                                        >
                                            <option>Select state</option>
                                            <option value="UP">Uttar Pradesh</option>
                                            <option value="DL">Delhi</option>
                                            <option value="MH">Maharashtra</option>
                                            {/* baki states add kar lena */}
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="mb-2 block text-sm font-medium text-gray-900"
                                        >
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                            value={formData.city} onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label
                                        htmlFor="country"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                        value={formData.country} onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Your address
                                    </label>
                                    <textarea
                                        id="address"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                                        placeholder="type your address here..."
                                        value={formData.address} onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                                    >
                                        + Save New Address
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DeliveryAddress;
