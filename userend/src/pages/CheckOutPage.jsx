import React from "react";
import { FaArrowLeft, FaArrowRight, FaLock } from "react-icons/fa";
import { LuTruck, LuCreditCard, LuShield } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openRazorpay } from "../utlity/payment";

const CheckOutPage = () => {
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cartSlice.cart)
    const [checkOutData, setCheckOutData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        shippingAddress: {
            address: "",
            city: "",
            postalCode: "",
            country: "India"
        },
    });

    const isFormValid =
        checkOutData.firstName.trim() &&
        checkOutData.lastName.trim() &&
        checkOutData.email.trim() &&
        checkOutData.shippingAddress.address.trim() &&
        checkOutData.shippingAddress.city.trim() &&
        checkOutData.shippingAddress.postalCode.trim();

    const [loading, setLoading] = useState(false)


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "firstName" || name === "lastName" || name === "email") {
            setCheckOutData((prev) => ({ ...prev, [name]: value }))
        }
        if (name === "address" || name === "city" || name === "postalCode") {
            setCheckOutData((prev) => ({ ...prev, shippingAddress: { ...prev.shippingAddress, [name]: value } }))
        }
    }

    const handleCheckOut = async () => {
        try {
            setLoading(true)

            // 1. Create Checkout
            const checkoutRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                {
                    shippingAddress: checkOutData.shippingAddress,
                    checkOutItems: cartItems.products,
                    totalPrice: cartItems.totalPrice + (cartItems.totalPrice * 0.18),
                    paymentMethod: "Razorpay Payment"
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })

            console.log(checkoutRes);


            // 2. Get checkoutId
            const checkoutId = checkoutRes.data._id;

            // 3. Create Payment Order

            const paymentOrderRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/payment/create-order`, {
                checkoutId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })

            console.log("logging payment response", paymentOrderRes);


            // 4. Get orderId + amount
            const { orderId, amount } = paymentOrderRes.data
            //5. Open Razorpay Payment Gateway
            openRazorpay(amount, orderId, checkoutId, navigate)
        } catch (err) {
            console.log(err);
        } finally {
            setCheckOutData({
                firstName: "",
                lastName: "",
                email: "",
                shippingAddress: {
                    address: "",
                    city: "",
                    postalCode: "",
                    country: "India"
                },
            })
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Progress Indicator */}
                    <div className="mb-12">
                        <div className="flex justify-center">
                            <div className="w-full max-w-2xl">
                                <div className="flex items-center">
                                    <div className="flex flex-col items-center relative">
                                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-black text-white font-bold">
                                            1
                                        </div>
                                        <div className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs font-medium text-black">
                                            Shipping
                                        </div>
                                    </div>
                                    <div className="flex-auto border-t-2 border-gray-300 transition duration-500 ease-in-out"></div>
                                    <div className="flex flex-col items-center relative">
                                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 font-bold">
                                            2
                                        </div>
                                        <div className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs font-medium text-gray-500">
                                            Payment
                                        </div>
                                    </div>
                                    <div className="flex-auto border-t-2 border-gray-300"></div>
                                    <div className="flex flex-col items-center relative">
                                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 text-gray-600 font-bold">
                                            3
                                        </div>
                                        <div className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs font-medium text-gray-500">
                                            Confirmation
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column - Shipping Info */}
                        <div className="w-full lg:w-2/3">
                            <Link to="/cartpage">
                                <button className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
                                    <FaArrowLeft className="text-sm" />
                                    Back to cart
                                </button>
                            </Link>

                            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <LuTruck className="mr-3 text-black text-3xl" />
                                    Shipping Information
                                </h2>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                name="firstName"
                                                onChange={handleInputChange}
                                                value={checkOutData.firstName}
                                                type="text"
                                                className="w-full border border-gray-200 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                name="lastName"
                                                onChange={handleInputChange}
                                                value={checkOutData.lastName}
                                                type="text"
                                                className="w-full border border-gray-200 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={checkOutData.email}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-200 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                name="country"
                                                value="INDIA"
                                                disabled
                                                className="w-full border border-gray-200 py-3 px-4 rounded-lg bg-gray-100 text-gray-400  cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                                placeholder="India"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Shipping Address
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                onChange={handleInputChange}
                                                value={checkOutData.shippingAddress.address}
                                                className="w-full border border-gray-200 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                                placeholder="123 Main St"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                City
                                            </label>
                                            <input
                                                name="city"
                                                value={checkOutData.shippingAddress.city}
                                                onChange={handleInputChange}
                                                type="text"
                                                className="w-full border border-gray-200 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Postal / ZIP Code
                                            </label>
                                            <input
                                                name="postalCode"
                                                value={checkOutData.shippingAddress.postalCode}
                                                onChange={handleInputChange}
                                                type="text"
                                                className="w-full border border-gray-200 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                                                placeholder="10001"
                                            />
                                        </div>
                                    </div>

                                    {/* Shipping Method */}
                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <LuTruck className="mr-2 text-blue-500" />
                                            Shipping Method
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all duration-200 cursor-pointer">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        id="standard"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                        defaultChecked
                                                    />
                                                    <label
                                                        htmlFor="standard"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        Standard Shipping
                                                    </label>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    Free
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all duration-200 cursor-pointer">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        id="express"
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <label
                                                        htmlFor="express"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        Express Shipping
                                                    </label>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    ₹200.00
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-20">
                                <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                                    Order Summary
                                </h3>

                                {/* Cart Items */}
                                <div className="space-y-4 max-h-50 overflow-y-auto pr-2">
                                    {cartItems.products.map((cartItem, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex gap-3 items-center">
                                                <div className="relative">
                                                    <img
                                                        src={cartItem.image}
                                                        className="w-12 max-h-13 object-fit "
                                                        alt={cartItem.name}
                                                    />

                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                                                        {cartItem.name.split(" ").slice(0, 2).join(" ")} ...
                                                    </h3>
                                                    <span className=" bg-black text-white text-[10px] font-medium py-1 px-3 rounded-full">
                                                        QTY: {cartItem.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm">
                                                    ₹{cartItem.discountPrice.toLocaleString('en-IN')}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Totals */}
                                <div className="mt-6 space-y-3 border-t border-gray-200 pt-4 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-800">
                                            ₹{cartItems.totalPrice.toLocaleString('en-IN')}

                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (2%)</span>
                                        <span className="text-gray-800">
                                            ₹{(cartItems.totalPrice * 0.02).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>

                                {/* Grand Total */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-black">₹{(cartItems.totalPrice + (cartItems.totalPrice * 0.02)).toLocaleString("en-IN")}</span>
                                    </div>
                                </div>

                                {/* Payment Security */}
                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <LuShield className="text-green-500" />
                                    <span>Secure Payment</span>
                                    <FaLock className="text-green-500 ml-2" />
                                </div>

                                {/* Checkout Button */}
                                <button
                                    disabled={!isFormValid || loading}
                                    onClick={handleCheckOut}
                                    className={`mt-6 w-full py-3 rounded-lg text-md font-medium flex items-center justify-center gap-2 transition-all duration-200
                                            ${!isFormValid || loading
                                            ? "bg-gray-400 text-gray-200 cursor-not-allowed shadow-none"
                                            : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:opacity-90 shadow-md hover:shadow-lg"
                                        }
  `}
                                >
                                    {loading ? <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            {/* Simplified path - faster rendering */}
                                            <path
                                                fill="currentColor"
                                                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                                opacity="0.25"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                                            />
                                        </svg>
                                        Processing...
                                    </> : <>
                                        <FaArrowRight className="text-sm" />
                                        Continue to Payment
                                    </>}
                                </button>

                                {/* Guarantee Message */}
                                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
                                    <LuShield className="flex-shrink-0 mt-0.5 text-blue-500" />
                                    <span>
                                        Your purchase is protected by our{" "}
                                        <span className="text-blue-600 cursor-pointer hover:underline">
                                            Buyer Protection Policy
                                        </span>
                                        . We guarantee a full refund if your item doesn't arrive or
                                        isn't as described.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckOutPage;
