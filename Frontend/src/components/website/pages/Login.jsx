import React from 'react'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import { NavLink } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center bg-gray-100 px-4 pt-20 pb-5">
                <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full grid md:grid-cols-2 overflow-hidden">

                    {/* Left Side - Form */}
                    <div className="p-8 md:p-12 flex items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign in now</h2>

                            <form className="space-y-4">

                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />


                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded shadow hover:bg-blue-700 transition"
                                >
                                    SIGN IN
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
                                  <NavLink to="/SignUp" className="pt-5">New to <span className='text-blue-500'>SabMilega</span>? Create an account</NavLink>
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

export default Login