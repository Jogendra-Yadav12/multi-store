import React, { useEffect, useState } from 'react'
import HeadingTag from '../layout/HeadingNav';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditCustomer = () => {

    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        email: '',
        number: '',
        user_type: ''
    })

   useEffect(() => {
    axios.get(`http://localhost:5000/api/customer/${id}`)
        .then(res => {
            const { password, ...rest } = res.data;

            // Set form data excluding password
            setFormData(rest);

            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
}, [id]);



    // form submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('customer full data:', formData);
        try {
            const res = await axios.put(`http://localhost:5000/api/customer/${id}`, formData);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/view-customer');
            } else {
                toast.error("Failed to update customer");
            }
        } catch (error) {
            console.log("Update Error", error);
            toast.error("Something went wrong");
        }
    }

    // handle change function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading category data...</p>;
    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title="Edit Customer" path='Edit Customer' />

            <div className='flex justify-end'>
                <button type="submit" form="updateCustomerForm" className="bg-indigo-600 text-white px-6 py-2 rounded">Update</button>
            </div>
            <div className="w-full bg-gray-100 p-6 rounded shadow">
                <form id='updateCustomerForm' onSubmit={handleSubmit} className="space-y-5 mt-5">
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
                            <div>
                                <label className="block mb-2 text-gray-700">Email</label>
                                <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                            </div>

                        </div>
                         <div className="w-full">
                            <div>
                                <label className="block mb-2 text-gray-700">Number</label>
                                <input type="number" name="number" value={formData.number} onChange={handleChange} className="w-full p-2 border rounded" />
                            </div>

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

export default EditCustomer