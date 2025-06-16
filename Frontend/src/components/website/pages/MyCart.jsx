import React from 'react'
import NavBar from '../layout/NavBar'
import NavCategories from '../layout/NavCategories'
import Footer from '../layout/Footer'
import { useApp } from '../../../context/AppContext'
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import axios from 'axios'
import { toast } from 'react-toastify'
const MyCart = () => {

    const { cartItems,fetchCartCount } = useApp();

    const removeCartItme = async (id) => {
        if (window.confirm('Are you sure you want to delete this category')) {
            try {
                await axios.delete(`http://localhost:5000/api/deleteCart/${id}`)
                toast.error('product remove from cart!');
                fetchCartCount()
            } catch (err) {
                console.error('Delete error:', err);
                toast.error("Failed to delete cart itme.");
            }
        }
    }

    return (
        <div className='text-center flex flex-col'>
            <NavBar />
            <NavCategories />
            <section className="py-8 antialiased md:py-6 bg-indigo-50 text-left">
                <div className="mx-auto px-2 lg:px-12 md:px-6">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">

                                {
                                    cartItems.length === 0 ? (
                                        <p className='text-4xl w-full border text-red-400 bg-white rounded-xl p-5 text-center'>Your Cart is Empty</p>
                                    ) : (
                                        <div className='space-y-3'>
                                            {
                                                cartItems.map((items, index) => {

                                                    return (
                                                        <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                                <a href="#" className="h-20 w-20 shrink-0 md:order-1">

                                                                    <img className="h-full w-full object-contain" src={items.image} alt={items.name.slice(0, 50)} />
                                                                </a>

                                                                <label for="counter-input" className="sr-only">Choose quantity:</label>
                                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                                    <div className="flex items-center">
                                                                        <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                                            </svg>
                                                                        </button>
                                                                        <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" placeholder="" value="2" required />
                                                                        <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokewidth="2" d="M9 1v16M1 9h16" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <div className="text-end md:order-4 md:w-32">
                                                                        <p className="text-base font-bold text-gray-700">₹{items.price}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                                    <a href="#" className="text-base font-medium text-gray-800 hover:underline">{items.name}</a>

                                                                    <div className="flex items-center gap-4">
                                                                        <button type="button" className=" bg-[#ffcc18] flex gap-1 items-center text-sm font-medium text-gray-50 px-2 py-1 rounded ">
                                                                            <FavoriteBorderSharpIcon sx={{ fontSize: { xs: 18, md: 18 } }} />
                                                                            <span>Add to Favorites</span>
                                                                        </button>

                                                                        <button type="button" className="flex items-center gap-1 text-sm font-medium text-red-500 hover:underline"
                                                                            onClick={() => removeCartItme(items.id)}
                                                                        >
                                                                            <ClearSharpIcon />
                                                                            <span>Remove</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }

                            </div>
                            <div className="hidden xl:mt-8 xl:block">
                                <h3 className="text-2xl font-semibold text-gray-900">People also bought</h3>
                                <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                                    <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
                                        <a href="#" className="overflow-hidden rounded">
                                            <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                            <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                        </a>
                                        <div>
                                            <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">iMac 27”</a>
                                            <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-900">
                                                <span className="line-through"> $399,99 </span>
                                            </p>
                                            <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2.5">
                                            <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                                </svg>
                                            </button>
                                            <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                                                Add to favourites
                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                            <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ">
                                                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
                                        <a href="#" className="overflow-hidden rounded">
                                            <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image" />
                                            <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image" />
                                        </a>
                                        <div>
                                            <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">Playstation 5</a>
                                            <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-900">
                                                <span className="line-through"> $799,99 </span>
                                            </p>
                                            <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$499</p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2.5">
                                            <button data-tooltip-target="favourites-tooltip-2" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                                </svg>
                                            </button>
                                            <div id="favourites-tooltip-2" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 ">
                                                Add to favourites
                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                            <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                                                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
                                        <a href="#" className="overflow-hidden rounded">
                                            <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                                            <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
                                        </a>
                                        <div>
                                            <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">Apple Watch Series 8</a>
                                            <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-900">
                                                <span className="line-through"> $1799,99 </span>
                                            </p>
                                            <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$1199</p>
                                        </div>
                                        <div className="mt-6 flex items-center gap-2.5">
                                            <button data-tooltip-target="favourites-tooltip-3" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                                </svg>
                                            </button>
                                            <div id="favourites-tooltip-3" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                                Add to favourites
                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                            </div>

                                            <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                                                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                                <p className="text-xl font-semibold text-gray-900">Order summary</p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                            <dd className="text-base font-medium text-gray-900">$7,592.00</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                            <dd className="text-base font-medium text-green-600">-$299.00</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                            <dd className="text-base font-medium text-gray-900">$99</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                            <dd className="text-base font-medium text-gray-900">$799</dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                                        <dt className="text-base font-bold text-gray-900">Total</dt>
                                        <dd className="text-base font-bold text-gray-900">$8,191.00</dd>
                                    </dl>
                                </div>

                                <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Proceed to Checkout</a>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                    <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                        Continue Shopping
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                                <form className="space-y-4">
                                    <div>
                                        <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900"> Do you have a voucher or gift card? </label>
                                        <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="" required />
                                    </div>
                                    <div>
                                        <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Apply Code</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default MyCart