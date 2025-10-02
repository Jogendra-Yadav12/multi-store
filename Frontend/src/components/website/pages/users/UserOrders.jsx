import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
// import { useParams } from 'react-router-dom';

const UserOrders = () => {
    const { user } = useAuth()
    const [ordersList, setOrdersList] = useState([]);



    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/getorder/${user.id}`);
                console.log(res.data);
                setOrdersList(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };

        if (user?.id) {
            fetchOrders();
        }
    }, [user]);
    return (
        <section className="bg-white py-8 antialiased rounded-xl shadow-sm border border-gray-200 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-6xl px-5">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-700 sm:text-2xl">My orders</h2>

                        <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                            <div>
                                <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900">Select order type</label>
                                <select id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-600 ">
                                    <option >All orders</option>
                                    <option value="pre-order">Pre-order</option>
                                    <option value="transit">In transit</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <span className="inline-block text-gray-500 "> from </span>

                            <div>
                                <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-600">Select duration</label>
                                <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600">
                                    <option >this week</option>
                                    <option value="this month">this month</option>
                                    <option value="last 3 months">the last 3 months</option>
                                    <option value="lats 6 months">the last 6 months</option>
                                    <option value="this year">this year</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flow-root sm:mt-8">
                        <div className="divide-y divide-gray-200 ">
                            {
                                ordersList.map((order) => {

                                    const orderDate = (oDate) => {
                                        const date = new Date(oDate);
                                        return date.toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })
                                    }

                                    return (
                                        <div key={order.id} className="flex flex-wrap items-center gap-y-4 py-6 border-b">
                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                <dt className="text-base font-medium text-gray-500 ">Order ID:</dt>
                                                <dd className="mt-1.5 text-base font-semibold text-gray-600">
                                                    <a href="#" className="hover:underline">#Sb{order.id}</a>
                                                </dd>
                                            </dl>

                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                <dt className="text-base font-medium text-gray-500 ">Date:</dt>
                                                <dd className="mt-1.5 text-base font-semibold text-gray-600">{orderDate(order.created_at)}</dd>
                                            </dl>

                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                <dt className="text-base font-medium text-gray-500 ">Price:</dt>
                                                <dd className="mt-1.5 text-base font-semibold text-gray-600">{order.total}</dd>
                                            </dl>

                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                <dt className="text-base font-medium text-gray-500 ">Status:</dt>
                                                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-200 px-2.5 py-1 text-xs font-medium text-yellow-900">
                                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                                    </svg>
                                                    {order.status}
                                                </dd>
                                            </dl>

                                            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                                <button type="button" className="w-full rounded-lg border border-red-600 px-3 py-2 text-center text-sm font-medium text-red-500 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto">Cancel order</button>
                                                <a href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 lg:w-auto">View details</a>
                                            </div>
                                        </div>
                                    )


                                })
                            }

                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default UserOrders