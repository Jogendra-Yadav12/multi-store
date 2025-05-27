import React, { useState } from 'react'
import HeadingTag from '../layout/HeadingNav'
import axios from 'axios'
import { toast } from 'react-toastify'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const AddCustomer = () => {

    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        email: '',
        password: '',
        number: '',
        user_type: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/add-customer', formData);
            if (res.data && (res.data.success === true || res.data.status === 'success')) {
                toast.success("Customer Added Successfully!");
                setFormData({ f_name: '', l_name: '', email: '', password: '', number: '', user_type: '' })
            } else {
                toast.error("Failed to add customer!");
            }
        } catch (err) {
            console.error("API Error:", err);
            toast.error("Something Went Wrong!")
        }
    }

    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title='Customers Management' path='Add Customer' />

            <div className='flex justify-end'>
                <button type="submit" form="addCustomerForm" className="bg-indigo-600 text-white px-6 py-2 rounded">Save</button>
            </div>
            <div className="w-full bg-gray-100 p-6 rounded shadow">
                <form id='addCustomerForm' onSubmit={handleSubmit} className="space-y-5 mt-5">
                    <div className="flex flex-col md:flex-row items-center gap-5">
                        <div className="w-full">
                            <label className="block mb-2 text-gray-600">First Name</label>
                            <input type="text" name="f_name" value={formData.f_name} onChange={handleChange} required className="w-full p-2 border rounded" />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-gray-600">Last Name</label>
                            <input type="text" name="l_name" value={formData.l_name} onChange={handleChange} required className="w-full p-2 border rounded" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-5">
                        <div className="w-full">
                            <label className="block mb-2 text-gray-700">Email</label>
                            <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>

                        <div className="w-full relative">
                            <label className="block mb-2 text-gray-700">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded pr-10"
                            />
                            <span
                                className="absolute right-3 mt-1 top-12 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <RemoveRedEyeOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-5">
                        <div className="w-full">
                            <label className="block mb-2 text-gray-700">Number</label>
                            <input type="number" name="number" value={formData.number} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-gray-600">User Type</label>
                            <select name="user_type" value={formData.user_type} onChange={handleChange} className="w-full p-2.5 border rounded">
                                <option value="">Select User Type</option>
                                <option value="A">Admin</option>
                                <option value="S">Seller</option>
                                <option value="C">Customer</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCustomer
