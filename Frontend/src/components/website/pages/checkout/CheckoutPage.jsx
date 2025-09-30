import React, { useState } from 'react'
import Footer from '../../layout/Footer'
import NavBar from '../../layout/NavBar'
import { useApp } from '../../../../context/AppContext'
import { useAuth } from '../../../../context/AuthContext'
import DeliveryAddress from '../../layout/address/DeliveryAddress'
import AddressCard from '../../layout/address/AddressCard'
// import { assets } from '../../../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { Link } from 'react-router-dom'

const CheckoutPage = () => {

    const { calculateSummary, cartItems, setCartItems, setCartCount } = useApp();
    const { user } = useAuth();
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
    const { platformFee, deliveryFee, saving, totalQty, totalPrice, totalPrice1 } = calculateSummary(cartItems, user);

    const [selectedAddress, setSelectedAddress] = useState(null)
    const [showCart, setShowCart] = useState(false)

    const [paymentMethod, setPaymentMethod] = useState("")

    const removeCartItme = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteCart/${id}`);
            toast.error('Product removed from your cart');
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
                    cartItem.id === item.id ? { ...cartItem, quantity: updatedQty } : cartItem
                )
            );
        } catch (err) {
            console.error("Error decreasing quantity", err);
        }
    };

    const handleIncrease = async (item) => {
        const updatedQty = item.quantity + 1;
        try {
            await axios.put(`http://localhost:5000/api/updateCart/${item.id}`, {
                product_id: item.product_id,
                customer_id: item.customer_id,
                quantity: updatedQty
            });
            setCartItems(prev =>
                prev.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: updatedQty } : cartItem
                )
            );
            toast.success(`Quantity updated! ${item.name} Quantity to '${item.quantity + 1}' `);
        } catch (err) {
            console.error("Error increasing quantity", err);
        }
    };

    const placeOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select a delivery address!");
            return
        }
        if (!paymentMethod) {
            toast.error("Please select a payment method!")
        }

        try {
        console.log();
        
          const res =  await axios.post("http://localhost:5000/api/add-order", {
                orderData: {
                    customer_id: user.id,
                    shipping_id: selectedAddress.id,
                    payment_id: 20,
                    subtotal: totalPrice1,
                    total: totalPrice,
                    platform_fee: platformFee,
                    delivery_charge: deliveryFee,
                    status: paymentMethod === "COD" ? "Pending" : "Processing"
                },
                orderProducts: cartItems.map((item) => ({
                    product_id: item.id,
                    name:item.name,
                    image:item.image,
                    quantity: item.quantity,
                    price: item.price
                }))
            });
   
        console.log("Order placed:", res.data);
        toast.success("Order Placed successfully");
        setCartItems([])
        setCartCount(0)
    } catch (err) {
        console.error("Error placing order:", err.response?.data || err.message);
        toast.error("Failed to place order.");

    }
}

return (
    <div className='text-center flex flex-col'>
        <NavBar />
        <section className="py-8 bg-indigo-50 antialiased md:py-16 px-2 lg:px-12 md:px-6 text-left">
            <div className="mx-auto px-4 2xl:px-0">
                <div className="mt-6 sm:mt-1 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className='w-full'>
                        <DeliveryAddress />
                        <AddressCard
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            onDeliveryHere={() => setShowCart(true)}
                        />



                        {showCart && selectedAddress && (
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-5xl">
                                <div className="space-y-6">
                                    {safeCartItems.length === 0 ? (
                                        <div className='w-full h-100 flex flex-col text-center items-center justify-center'>
                                            {/* <img src={assets.emptyCart} className='w-80 mix-blend-multiply' alt='emptyCart' /> */}
                                            <p className='text-gray-500 text-xl'>Your Cart is empty!</p>
                                        </div>
                                    ) : (
                                        <div className='space-y-3'>
                                            {cartItems.map((items, index) => {
                                                const qtyTotalPrice = items.quantity * items.price;
                                                return (
                                                    <div key={index} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                                        <div className="w-full space-y-4 md:flex md:items-center md:flex-start md:gap-6 md:space-y-0">
                                                            <a href="#" className="h-20 w-20 shrink-0 md:order-1">
                                                                <img className="h-full w-full object-contain" src={items.image} alt={items.name.slice(0, 50)} />
                                                            </a>
                                                            <div className="flex md:w-2/5 flex-col md:flex-row gap-5 items-end justify-between md:order-3">
                                                                <div className="flex items-center w-full">
                                                                    <button type="button" onClick={() => handleDecrease(items)} className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                                        <RemoveSharpIcon />
                                                                    </button>
                                                                    <p className='px-3'>{items.quantity}</p>
                                                                    <button type="button" onClick={() => handleIncrease(items)} className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                                        <AddSharpIcon />
                                                                    </button>
                                                                </div>
                                                                <div className='w-full flex items-end gap-5 justify-between'>
                                                                    <div className="md:order-4 w-full">
                                                                        <span className='text-xs text-green-500 font-semibold'>Price</span>
                                                                        <p className="text-base font-bold text-gray-700">₹{items.price.toLocaleString('en-IN')}</p>
                                                                    </div>
                                                                    <div className="md:order-4 w-full">
                                                                        <span className='text-xs text-red-500 font-semibold'>Total Price</span>
                                                                        <p className="text-base font-bold text-gray-700">₹{qtyTotalPrice.toLocaleString('en-IN')}/-</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                                <a href="#" className="md:text-sm lg:text-base text-md font-medium md:line-clamp-2 text-gray-800 hover:underline">{items.name}</a>
                                                                <div className="flex items-center gap-4">
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
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 ">Payment</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="credit-card" className="font-medium leading-none text-gray-900 "> Credit Card </label>
                                            <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 ">Pay with your credit card</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="pay-on-delivery"
                                                value="COD"
                                                aria-describedby="pay-on-delivery-text" type="radio" name="status" className="h-4 w-4 border-gray-300 bg-white text-primary-600"
                                                checked={paymentMethod === "COD"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="pay-on-delivery" className="font-medium leading-none text-gray-900 "> Payment on delivery </label>
                                            <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 ">payment processing fee</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label htmlFor="paypal-2" className="font-medium leading-none text-gray-900 "> Upi account </label>
                                            <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 ">Connect to your account</p>
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
                                        <dd className="text-base font-medium text-gray-900">₹{totalPrice1.toLocaleString('en-IN')}</dd>
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
                                    <dd className="text-base font-bold text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</dd>
                                </dl>
                            </div>

                            {showCart && selectedAddress && (
                                <button onClick={placeOrder} className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                                    Proceed to Payment
                                </button>
                            )}

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500"> or </span>
                                <Link
                                    to="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:text-blue-500  hover:no-underline">
                                    Continue Shopping

                                </Link>
                            </div>
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
