import React from 'react'
import HeadingTag from '../layout/HeadingNav'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditBrand = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/api/getbrand/${id}`)
            .then(res => {
                setFormData(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/brand/${id}`, formData)
            toast.success(res.data.message);
            navigate('/view-brands');
        } catch (error) {
            console.log("Update Error", error);
            toast.error("Something went wrong");
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }



    if (loading) return <p className="text-center mt-10 text-gray-500">Loading Brands data...</p>;
    return (
        <div className='min-h-screen flex flex-col gap-6 md:p-5 p-2 pt-8'>
            <HeadingTag title='Brand Management' path='Add Brand' />

            <div className='flex justify-end'>
                <button type="submit" form="updateBrandForm" className="bg-indigo-600 text-white px-6 py-2 rounded">Update</button>
            </div>
            <div className="w-full bg-gray-100 p-6 rounded shadow">
                <form id='updateBrandForm' onSubmit={handleSubmit} className="space-y-5 mt-5">
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

export default EditBrand