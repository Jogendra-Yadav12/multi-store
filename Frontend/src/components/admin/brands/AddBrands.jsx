import React from 'react'
import { useState } from 'react'
import HeadingTag from '../layout/HeadingNav'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddBrands = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
    })
    const handleSubmit = async (e) => {
         e.preventDefault()
        try {

            const res = await axios.post('http://localhost:5000/api/add-brand', formData);
            // console.log(formData);
            
            if (res.data && (res.data.success === true || res.data.status === 'success')) {
                toast.success("Brand Added Successfully!");
                navigate("/view-brands")
            } else {
                toast.error("Failed to add brand")
            }

        } catch (err) {
            console.error("Add Brand Api Error:", err);
            toast.error("Something Went Wrong!")
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title='Brand Management' path='Add Brand' />

            <div className='flex justify-end'>
                <button type="submit" form="addBrandForm" className="bg-indigo-600 text-white px-6 py-2 rounded">Save</button>
            </div>
            <div className="w-full bg-gray-100 p-6 rounded shadow">
                <form id='addBrandForm' onSubmit={handleSubmit} className="space-y-5 mt-5">
                    <div className="flex flex-col md:flex-row items-center gap-5">
                        <div className="w-full">
                            <label className="block mb-2 text-gray-600">Brand Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBrands