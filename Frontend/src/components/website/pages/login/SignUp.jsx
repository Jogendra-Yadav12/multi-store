import React, { useState } from 'react'
import NavBar from '../../layout/NavBar'
import Footer from '../../layout/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        email: '',
        password: '',
        number: '',
        user_type: 'C'
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/add-customer', formData);
            if (res.data && (res.data.success === true || res.data.status === 'success')) {
                toast.success("You are Registered Successfully!")
                navigate("/login")
            } else {
                toast.error("Failed to Register")
            }
        }
        catch (err) {
            console.error("API Error:", err);
            toast.error("Something Went Wrong!")
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center bg-gray-100 px-4 py-2">
                <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full grid md:grid-cols-2 overflow-hidden">

                    {/* Left Side - Form */}
                    <div className="p-8 md:p-12 flex items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Register now</h2>

                            <form onSubmit={handleSubmit}  className="space-y-4">

                                <div className="flex gap-4">
                                    <input type='hidden' name='user_type' onChange={handleChange} value={formData.user_type} />
                                    <input
                                        type="text"
                                        name='f_name'
                                        placeholder="First name"
                                        value={formData.f_name}
                                        onChange={handleChange} required
                                        className="w-1/2 border border-gray-300 bg-white/80 rounded px-4 py-2"
                                    />
                                    <input
                                        type="text"
                                        name='l_name'
                                        placeholder="Last name"
                                        className="w-1/2 border border-gray-300 bg-white/80 rounded px-4 py-2"
                                        value={formData.l_name}
                                        onChange={handleChange} required
                                    />
                                </div>

                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Email address"
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                    value={formData.email}
                                    onChange={handleChange} required
                                />
                                <input
                                    type="number"
                                    name='number'
                                    placeholder="Phone number"
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                    value={formData.number}
                                    onChange={handleChange} required
                                />
                                <div className="w-full relative">

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border rounded pr-10"
                                        placeholder='*********'
                                    />
                                    <span
                                        className="absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                        onClick={() => setShowPassword(prev => !prev)}
                                    >
                                        {showPassword ? <RemoveRedEyeOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
                                    </span>
                                </div>


                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded shadow hover:bg-blue-700 transition"
                                >
                                    SIGN UP
                                </button>
                            </form>

                            {/* <p className="text-sm text-center mt-6 text-gray-500">or sign up with:</p>  */}

                            <div className="flex justify-center mt-4 gap-6 text-blue-600 text-xl">
                                <i className="fab fa-facebook-f cursor-pointer"></i>
                                <i className="fab fa-google cursor-pointer"></i>
                                <i className="fab fa-twitter cursor-pointer"></i>
                                <i className="fab fa-github cursor-pointer"></i>
                            </div>

                            <div className='text-center'>
                                <p className="text-base text-gray-800">
                                    Already have an account?{' '}
                                    <NavLink to="/login" className="text-blue-600 hover:underline">
                                        Login here
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="hidden md:block">
                        <img
                            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                            alt="Phone"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignUp