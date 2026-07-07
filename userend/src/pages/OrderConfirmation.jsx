import React from 'react'
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuTruck } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../redux/slices/orderSlice';
import confetti from "canvas-confetti";
import { FaArrowLeft } from 'react-icons/fa';



const OrderConfirmation = () => {
    //  navigate(`/payment?checkoutId=${checkoutId}&orderId=${orderId}&amount=${amount}`)
    const location = useLocation();
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("orderid")

    const { loading, data, error } = useSelector((state) => state.orderSlice)
    const orderedItems = data?.orderItems || [];
    console.log("confirmed order", data);

    const orderDate = new Date(data?.createdAt);
    const formattedOrderDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderById(orderId))
        }
        confetti({
            particleCount: 400,
            spread: 100,
            origin: { y: 0.6 },
        });
    }, [orderId, dispatch])

    return (
        <div className='w-full min-h-screen flex justify-center'>
            <div className='max-w-4xl  w-full mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className="rounded-2xl  flex flex-col items-center">
                    <div className='flex flex-col items-center'>
                        <div className='w-[100px] h-[100px] bg-green-100 rounded-full flex items-center justify-center'>

                            <IoIosCheckmarkCircleOutline className='text-green-600 text-6xl' />
                        </div>

                        <h1 className='text-3xl font-bold text-center text-green-600 mb-4 mt-6'>Order Confirmed! </h1>
                        <p className='text-lg  text-gray-500 text-center'>Thank you for your purchase! Your order has been received and is being processed.</p>
                    </div>
                </div>
                <div className='h-[1px] w-full bg-gray-200 my-7'> </div>

                <div className='w-full max-w-4xl mx-auto bg-white rounded-2xl  border border-gray-300 overflow-hidden'>
                    {/* Header with gradient accent */}
                    <div className='bg-gradient-to-r from-gray-50 to-white px-6 md:px-8 py-6 border-b border-gray-200 text-center'>
                        <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>Order Details</h2>
                        <p className='text-sm text-gray-500 mt-1'>Review your order information</p>
                    </div>

                    {/* Order Info Grid */}
                    <div className='px-6 md:px-8 pt-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Left Column */}
                            <div className='space-y-4'>
                                <div className='bg-gray-50 rounded-lg p-4 border border-gray-100'>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                        <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Order Number</h3>
                                    </div>
                                    <p className='font-mono text-sm font-medium text-gray-900'>{data?.paymentResult?.razorpay_order_id || 'N/A'}</p>
                                </div>

                                <div className='bg-green-50 rounded-lg p-4 border border-green-100'>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <h3 className='text-xs font-semibold text-green-700 uppercase tracking-wider'>Estimated Delivery</h3>
                                    </div>
                                    <p className='text-sm font-semibold text-green-800'>Thursday, May 7, 2026</p>
                                    <p className='text-xs text-green-600 mt-1'>Free Express Shipping</p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className='space-y-4'>
                                <div className='bg-gray-50 rounded-lg p-4 border border-gray-100'>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Order Date</h3>
                                    </div>
                                    <p className='text-sm font-medium text-gray-900'>{formattedOrderDate}</p>
                                </div>

                                <div className='bg-gray-50 rounded-lg p-4 border border-gray-100'>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Payment Method</h3>
                                    </div>
                                    <p className='text-sm font-medium text-gray-900'>Credit Card •••• 3456</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='relative my-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-200'></div>
                        </div>
                        <div className='relative flex justify-center'>
                            <span className='bg-white px-4 text-xs text-gray-400'>Shipping Information</span>
                        </div>
                    </div>

                    {/* Shipping Address Card */}
                    <div className='px-6 md:px-8 pb-8'>
                        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 overflow-hidden'>
                            {/* Address Header */}
                            <div className='bg-blue-100/50 px-6 py-4 border-b border-blue-100'>
                                <div className='flex items-center justify-center gap-3'>
                                    <div className='p-2 bg-white rounded-lg shadow-sm'>
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-gray-900'>Shipping Address</h3>
                                        <p className='text-xs text-gray-500'>Where your order will be delivered</p>
                                    </div>
                                </div>
                            </div>

                            {/* Address Details */}
                            <div className='px-6 py-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='space-y-3'>
                                        <div className='flex items-start gap-2'>
                                            <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <div>
                                                <p className='text-xs text-gray-500'>Full Name</p>
                                                <p className='text-sm font-medium text-gray-900'>{data?.user?.name || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-start gap-2'>
                                            <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <p className='text-xs text-gray-500'>Email Address</p>
                                                <p className='text-sm font-medium text-gray-900'>{data?.user?.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='space-y-3'>
                                        <div className='flex items-start gap-2'>
                                            <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <div>
                                                <p className='text-xs text-gray-500'>Street Address</p>
                                                <p className='text-sm font-medium text-gray-900'>{data?.shippingAddres?.address || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div className='flex items-start gap-2'>
                                                <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <div>
                                                    <p className='text-xs text-gray-500'>City</p>
                                                    <p className='text-sm font-medium text-gray-900'>{data?.shippingAddres?.city || 'N/A'}</p>
                                                </div>
                                            </div>
                                            <div className='flex items-start gap-2'>
                                                <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <p className='text-xs text-gray-500'>Country</p>
                                                    <p className='text-sm font-medium text-gray-900'>{data?.shippingAddres?.country || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-start gap-2'>
                                            <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <div>
                                                <p className='text-xs text-gray-500'>Postal Code</p>
                                                <p className='text-sm font-medium text-gray-900'>{data?.shippingAddres?.postalCode || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer with badge */}
                            <div className='bg-blue-100/30 px-6 py-3 border-t border-blue-100'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse'></div>
                                        <span className='text-xs text-gray-600'>Delivery confirmation will be sent to your email</span>
                                    </div>
                                    <div className='text-xs text-blue-600 font-medium'>✓ Verified Address</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-5 md:mt-7 w-full border border-gray-300 rounded-2xl p-4 md:p-8 flex flex-col items-center justify-center'>
                    <h2 className='text-2xl mb-7 font-semibold text-[#0F172A]'>Order Products</h2>

                    {/* 👇 scroll wrapper */}
                    <div className="w-full overflow-hidden">
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-gray-200'>
                                    <th className='py-3 px-3 md:py-5 md:px-4 text-gray-400 text-left'>Product</th>
                                    <th className='py-3 px-3 md:py-5 md:px-4 text-gray-400 text-center'>Quantity</th>
                                    <th className='py-3 px-3 md:py-5 md:px-4 text-gray-400 text-center'>Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orderedItems.map((item) => (
                                    <tr key={item.productId} className='border-b border-gray-200'>
                                        <td className='py-3 px-3 md:py-5 md:px-4'>
                                            <div className='flex items-center gap-4'>
                                                <div className='w-[80px] h-[80px]'>
                                                    <img src={item.image} alt="" className='w-full h-full rounded-2xl object-cover' />
                                                </div>
                                                <div>
                                                    <h3 className='font-medium'>{item.name}</h3>
                                                    <p className='text-sm text-gray-500'>{item.productId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center'>{item.quantity}</td>
                                        <td className='text-center'>₹ {item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='mt-5 md:mt-7 w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-300 overflow-hidden'>
                    <div className='px-6 md:px-8 py-8'>
                        <div className='text-center mb-8'>
                            <h2 className='text-2xl font-bold text-gray-900'>Order Timeline</h2>
                            <p className='text-sm text-gray-500 mt-1'>Track your order progress</p>
                        </div>

                        {/* Vertical Timeline */}
                        <div className='relative'>
                            {/* Vertical Line */}
                            <div className='absolute left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-gray-300'></div>

                            {/* Step 1 */}
                            <div className='relative flex gap-4 pb-8 group'>
                                <div className='relative z-10'>
                                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform'>
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='flex-1 pt-0.5'>
                                    <div className='bg-gray-50 rounded-lg p-3'>
                                        <div className='flex justify-between items-start mb-1'>
                                            <h3 className='font-semibold text-gray-900'>Order Confirmed</h3>
                                            <span className='text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full'>Completed</span>
                                        </div>
                                        <p className='text-xs text-gray-500'>Your order has been confirmed and is being processed</p>
                                        <p className='text-xs text-gray-400 mt-2'>Just now</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className='relative flex gap-4 pb-8 group'>
                                <div className='relative z-10'>
                                    <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform'>
                                        <MdOutlineNotificationsNone className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className='flex-1 pt-0.5'>
                                    <div className='bg-gray-50 rounded-lg p-3'>
                                        <div className='flex justify-between items-start mb-1'>
                                            <h3 className='font-semibold text-gray-900'>Shipping Notification</h3>
                                            <span className='text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full'>In Progress</span>
                                        </div>
                                        <p className='text-xs text-gray-500'>You'll receive tracking information once shipped</p>
                                        <div className='mt-2'>
                                            <div className='w-full h-1 bg-gray-200 rounded-full overflow-hidden'>
                                                <div className='w-2/3 h-full bg-purple-500 rounded-full'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className='relative flex gap-4 group'>
                                <div className='relative z-10'>
                                    <div className='w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform'>
                                        <LuTruck className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className='flex-1 pt-0.5'>
                                    <div className='bg-gray-50 rounded-lg p-3'>
                                        <div className='flex justify-between items-start mb-1'>
                                            <h3 className='font-semibold text-gray-400'>Real-time Tracking</h3>
                                            <span className='text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full'>Upcoming</span>
                                        </div>
                                        <p className='text-xs text-gray-400'>Track your package once it's shipped</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Date Banner */}
                        <div className='mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm'>
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-500'>Estimated Delivery</p>
                                        <p className='text-sm font-bold text-gray-900'>Thursday, May 7, 2026</p>
                                    </div>
                                </div>
                                <button className='text-xs font-medium text-blue-600 hover:text-blue-700'>
                                    Track Order →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-7'>
                    <Link to="/" className="px-7 py-3  border-1 border-gray-300 font-medium rounded-md text-sm flex items-center gap-4 hover:bg-[#F1F5F9] transotion-all duration-200 group">
                        <FaArrowLeft className="text-xs ront-regular text-gray-800  group-hover:-translate-x-1 transotion-all duration-200" />
                        Continue Shopping
                    </Link>
                    <Link to="/orders" className='px-7 py-3 bg-black text-white font-medium rounded-md text-md flex items-center justify-center gap-4 hover:bg-gray-800 transition-all duration-200 group '>
                        View Order Details →
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmation
