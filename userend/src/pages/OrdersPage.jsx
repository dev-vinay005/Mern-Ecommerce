import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/orderSlice';
import {
    FaCheckCircle,
    FaTruck,
    FaBox,
    FaClock,
    FaChevronRight,
    FaMapMarkerAlt,
    FaCreditCard,
    FaCalendarAlt,
    FaRupeeSign,
    FaShoppingBag,
    FaSpinner,
    FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const { data, loading, error } = useSelector((state) => state.orderSlice);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="w-12 h-12 text-blue-600 mx-auto animate-spin" />
                    <p className="mt-4 text-gray-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
                    <p className="text-red-600">Error loading orders: {error}</p>
                    <button
                        onClick={() => dispatch(fetchOrders())}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Ensure data is always an array
    const orders = Array.isArray(data) ? data : data ? [data] : [];

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return <FaCheckCircle className="w-5 h-5 text-green-500" />;
            case 'processing':
                return <FaBox className="w-5 h-5 text-yellow-500" />;
            case 'shipped':
                return <FaTruck className="w-5 h-5 text-blue-500" />;
            default:
                return <FaClock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <FaShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">No orders found</p>
                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-1">Track and manage your orders</p>

                    <Link to="/" className="px-7 py-3  mt-4 w-fit  border-1 border-gray-300 font-medium rounded-md text-sm flex items-center gap-4 hover:bg-[#F1F5F9] transotion-all duration-200 group">
                        <FaArrowLeft className="text-xs ront-regular text-gray-800  group-hover:-translate-x-1 transotion-all duration-200" />
                        Continue Shopping
                    </Link>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Order Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Order ID</p>
                                            <p className="font-mono text-sm font-medium text-gray-900">
                                                {order._id}
                                            </p>
                                        </div>
                                        <div className="h-6 w-px bg-gray-300" />
                                        <div>
                                            <p className="text-sm text-gray-500">Placed on</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span>{order.status || 'Pending'}</span>
                                        </div>
                                        <FaChevronRight className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Order Items */}
                                    <div className="lg:col-span-2">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                                            Order Items
                                        </h3>
                                        <div className="space-y-4">
                                            {order.orderItems?.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <FaBox className="w-8 h-8 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Quantity: {item.quantity} × ₹{item.price?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">
                                                            ₹{(item.price * item.quantity)?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    <div className="bg-gray-50 rounded-lg p-5 space-y-4">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                            Order Summary
                                        </h3>

                                        {/* Total Price */}
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                            <span className="text-gray-600">Total Amount</span>
                                            <span className="text-xl font-bold text-gray-900 flex items-center gap-1">
                                                <FaRupeeSign className="w-4 h-4" />
                                                {order.totalPrice?.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Payment Status */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Payment</span>
                                            <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </div>

                                        {/* Payment Method */}
                                        {order.paymentMethod && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaCreditCard className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-600">{order.paymentMethod}</span>
                                            </div>
                                        )}

                                        {/* Paid Date */}
                                        {order.paidAt && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-600">Paid on {formatDate(order.paidAt)}</span>
                                            </div>
                                        )}

                                        {/* Shipping Address */}
                                        {order.shippingAddres && (
                                            <div className="pt-2 border-t border-gray-200">
                                                <div className="flex items-start gap-2">
                                                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400 mt-0.5" />
                                                    <div className="text-sm">
                                                        <p className="font-medium text-gray-700">Shipping Address</p>
                                                        <p className="text-gray-600">
                                                            {order.shippingAddres.address},<br />
                                                            {order.shippingAddres.city} - {order.shippingAddres.postalCode},<br />
                                                            {order.shippingAddres.country}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Track Order Button */}
                                        <button className="w-full mt-2 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition">
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Order Footer - Payment Details */}
                            {order.paymentResult && (
                                <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100">
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                        <span>Payment ID: {order.paymentResult.razorpay_payment_id}</span>
                                        <span>Order ID: {order.paymentResult.razorpay_order_id}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;