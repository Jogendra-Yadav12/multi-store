import React from 'react'
import Footer from '../../layout/Footer'
import NavBar from '../../layout/NavBar'
import { useApp } from '../../../../context/AppContext'
import { useAuth } from '../../../../context/AuthContext'
import DeliveryAddress from '../../layout/address/DeliveryAddress'
import AddressCard from '../../layout/address/AddressCard'

const CheckoutPage = () => {

    const { calculateSummary, cartItems } = useApp();
    const { user } = useAuth();

    const { platformFee, deliveryFee, saving, totalQty, totalPrice, totalPrice1 } = calculateSummary(cartItems, user);

    return (
        <div className='text-center flex flex-col'>
            <NavBar />
            <section className="py-8 bg-indigo-50 antialiased md:py-16 px-2 lg:px-12 md:px-6 text-left">
                <div className="mx-auto px-4 2xl:px-0">

                    <div className="mt-6 sm:mt-1 lg:flex lg:items-start lg:gap-12 xl:gap-16">

                        <div className='w-full'>
                            <AddressCard/>
                            <DeliveryAddress />
                        </div>

                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg sm:p-6">
                                <p className="text-xl font-semibold text-gray-900 border-b-2 border-dashed border-gray-300 py-3">Order summary</p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-600">Price ({totalQty} item)</dt>
                                            <dd className="text-base font-medium text-gray-900">₹{totalPrice1}</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500">Savings</dt>
                                            <dd className="text-base font-medium text-green-600">-₹{saving}</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500">Delivery charge</dt>
                                            <dd className="text-base font-medium text-gray-900">₹{deliveryFee}</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500">Platform Fee</dt>
                                            <dd className="text-base font-medium text-gray-900">₹{platformFee}</dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                                        <dt className="text-base font-bold text-gray-900">Total</dt>
                                        <dd className="text-base font-bold text-gray-900">₹{totalPrice}</dd>
                                    </dl>
                                </div>

                                <a href="checkout" className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Place Order</a>


                            </div>

                           

                            <div className="space-y-1">
                                <p className="text-sm font-normal text-gray-500">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline">Sign in or create an account now.</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default CheckoutPage