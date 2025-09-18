import React from 'react'
import NavBar from '../../layout/NavBar'
import NavCategories from '../../layout/NavCategories'
import Footer from '../../layout/Footer'
import { useApp } from '../../../../context/AppContext'
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import axios from 'axios'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import { toast } from 'react-toastify'
import TodayDeals from '../../layout/TodayDeals'
import { useAuth } from '../../../../context/AuthContext'
import { assets } from '../../../../assets/assets'
const MyCart = () => {
    const { cartItems, setCartItems, setCartCount, calculateSummary } = useApp();
    const { user } = useAuth()

    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    // const totlaItems = cartItems.length;
    const {platformFee, deliveryFee, saving, totalQty, totalPrice, totalPrice1} = calculateSummary(cartItems, user);

    const removeCartItme = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteCart/${id}`);
            toast.error('Product removed from your cart');

            // Remove from context state directly
            setCartItems(prev => prev.filter(item => item.id !== id));
            setCartCount(prev => prev - 1);
        } catch (err) {
            console.error('Delete error:', err);
            toast.error("Failed to delete cart item.");
        }
    };


    const handleDecrease = async (item) => {
        if (item.quantity <= 1) return;

        const updatedQty = item.quantity - 1;

        try {
            await axios.put(`http://localhost:5000/api/updateCart/${item.id}`, {
                product_id: item.product_id,
                customer_id: item.customer_id,
                quantity: updatedQty
            });

            setCartItems(prev =>
                prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: updatedQty }
                        : cartItem
                )
            );


        } catch (err) {
            console.error("Error decreasing quantity", err);
        }
    };


    const handleIncrease = async (item) => {
        // if (item.quantity >= 5) {
        //     return toast.warn("You can add only 5 items");
        // }

        const updatedQty = item.quantity + 1;

        try {
            await axios.put(`http://localhost:5000/api/updateCart/${item.id}`, {
                product_id: item.product_id,
                customer_id: item.customer_id,
                quantity: updatedQty
            });

            setCartItems(prev =>
                prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: updatedQty }
                        : cartItem
                )
            );

            toast.success(`Quantity updated! ${item.name} Quantity to '${item.quantity}' `);

        } catch (err) {
            console.error("Error increasing quantity", err);
        }
    };



    return (
        <div className='text-center flex flex-col'>
            <NavBar />
            <NavCategories />
            <section className="py-8 antialiased md:py-6 bg-green-50 text-left">
                <div className="mx-auto px-2 lg:px-12 md:px-6 ">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-5xl">
                            <div className="space-y-6">

                                {
                                    safeCartItems && cartItems.length === 0 ? (
                                        <div className='w-full h-100 flex flex-col text-center items-center justify-center'>
                                            <img src={assets.emptyCart} className='w-80 mix-blend-multiply' alt='emptyCart' />
                                            <p className='text-gray-500 text-xl'>Cart is empty</p>
                                        </div>
                                    ) : (
                                        <div className='space-y-3'>
                                            {
                                                cartItems.map((items, index) => {

                                                    const qtyTotalPrice = items.quantity * items.price;



                                                    return (
                                                        <div key={index} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                                            <div className="w-full space-y-4 md:flex md:items-center md:flex-start md:gap-6 md:space-y-0">
                                                                <a href="#" className="h-20 w-20 shrink-0 md:order-1">

                                                                    <img className="h-full w-full object-contain" src={items.image} alt={items.name.slice(0, 50)} />
                                                                </a>


                                                                <div className="flex md:w-2/5 flex-col md:flex-row gap-5 items-end justify-between md:order-3">
                                                                    <div className="flex items-center w-full">
                                                                        <button type="button" onClick={() => handleDecrease(items)} id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                                            <RemoveSharpIcon />
                                                                        </button>
                                                                        <p className='px-3'>{items.quantity}</p>
                                                                        <button type="button" onClick={() => handleIncrease(items)} id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                                            <AddSharpIcon />
                                                                        </button>
                                                                    </div>
                                                                    <div className='w-full flex items-end gap-5 justify-between'>
                                                                        <div className="md:order-4 w-full">
                                                                            <span className='text-xs text-green-500 font-semibold'>Price</span>
                                                                            <p className="text-base font-bold text-gray-700">₹{items.price}</p>
                                                                        </div>
                                                                        <div className="md:order-4 w-full">
                                                                            <span className='text-xs text-red-500 font-semibold'>Total Price</span>
                                                                            <p className="text-base font-bold text-gray-700">₹{qtyTotalPrice}/-</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                                    <a href="#" className="md:text-sm lg:text-base text-md font-medium md:line-clamp-2 text-gray-800 hover:underline">{items.name}</a>

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

                        </div>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
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

                                <a href="checkout" className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300">Proceed to Checkout</a>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500"> or </span>
                                    <a href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:text-blue-500  hover:no-underline">
                                        Continue Shopping

                                    </a>
                                </div>
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
                           
                        </div>
                    </div>
                </div>


                <div className="mt-10">
                    <TodayDeals />
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default MyCart