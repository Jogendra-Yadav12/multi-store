import React from 'react'
import Footer from '../layout/Footer'
import NavBar from '../layout/NavBar'
import { useApp } from '../../../context/AppContext'
import { useAuth } from '../../../context/AuthContext'

const CheckoutPage = () => {

    const { calculateSummary, cartItems } = useApp();
    const { user } = useAuth();

    const { platformFee, deliveryFee, saving, totalQty, totalPrice, totalPrice1 } = calculateSummary(cartItems, user);

    return (
        <div className='text-center flex flex-col'>
            <NavBar />
            <section className="py-8 bg-indigo-50 antialiased md:py-16 px-2 lg:px-12 md:px-6 text-left">
                <form className="mx-auto px-4 2xl:px-0">
                   
                    <div className="mt-6 sm:mt-1 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white p-4 shadow-lg sm:p-6 space-y-8">
                            <div className="space-y-5">
                                <h2 className="text-2xl font-semibold text-gray-600">Add Your Delivery Details</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900"> Your name </label>
                                        <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Bonnie Green" required />
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
                                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">

                                        + Add new address
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900">Payment</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="credit-card" className="font-medium leading-none text-gray-900"> Credit Card </label>
                                                <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500">Pay with your credit card</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">Delete</button>

                                            <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">Edit</button>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="pay-on-delivery" className="font-medium leading-none text-gray-900"> Payment on delivery </label>
                                                <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500">+$15 payment processing fee</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">Delete</button>

                                            <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">Edit</button>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="paypal-2" className="font-medium leading-none text-gray-900"> Paypal account </label>
                                                <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500">Connect to your account</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">Delete</button>

                                            <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900">Delivery Methods</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="dhl" className="font-medium leading-none text-gray-900"> $15 - DHL Fast Delivery </label>
                                                <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500">Get it by Tommorow</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="fedex" className="font-medium leading-none text-gray-900"> Free Delivery - FedEx </label>
                                                <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500">Get it by Friday, 13 Dec 2023</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="express" aria-describedby="express-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label htmlFor="express" className="font-medium leading-none text-gray-900"> $49 - Express Delivery </label>
                                                <p id="express-text" className="mt-1 text-xs font-normal text-gray-500">Get it today</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


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

                                <a href="checkout" className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Proceed to Payment</a>


                            </div>

                             <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900"> Do you have a voucher or gift card? </label>
                                        <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="" required />
                                    </div>
                                    <div>
                                        <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-[#f1c422] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#ffd849] focus:outline-none focus:ring-4 focus:ring-primary-300">Apply Code</button>
                                    </div>
                                </form>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm font-normal text-gray-500">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline">Sign in or create an account now.</a>.</p>
                            </div>
                        </div>
                    </div>
                </form>
            </section>

            <Footer />
        </div>
    )
}

export default CheckoutPage