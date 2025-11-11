import React, { useState } from 'react'
import {
    FiTag,
    FiBox,
    FiShoppingCart,
    FiTrendingUp,
    FiUsers,
    FiDollarSign,
} from "react-icons/fi";
import { FaLongArrowAltUp } from "react-icons/fa";
import { LuStore } from "react-icons/lu";
import { BsGraphUpArrow } from "react-icons/bs";

const DashBoardOverView = () => {
    const [stats, setStats] = useState({
        users: 0,
        categories: 0,
        products: 0,
        orders: 0,
    });
    return (
        <div className="bg-[#F9FAFB] p-9 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Dashboard Overview
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Welcome back! Here's what's happening with your business today.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm flex items-center">
                    <span className="text-green-500 mr-2">
                        <FiTrendingUp />
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                        Growth: <span className="text-green-600">80%</span> this month
                    </span>
                </div>
            </div>

            <div className="mt-10 w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-lg shadow space-x-4">
                    <div className="flex justify-between">
                        <p className="text-md text-gray-600 font-medium ">
                            Total Users
                        </p>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                            <FiUsers className=" text-white text-2xl" />
                        </div>
                    </div>
                    <p className="mt-4 text-4xl font-bold">+{stats.users}</p>
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium text-xs">
                            <FaLongArrowAltUp className="text-green-600 text-sm" />
                            05.5%
                        </div>
                        <p className="text-xs text-gray-500">Total Users this month</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow flex flex-col  space-x-4">
                    <div className="flex justify-between">
                        <p className="text-md text-gray-600 font-medium ">Categories</p>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                            <FiTag className=" text-white text-2xl" />
                        </div>
                    </div>
                    <p className="mt-4 text-4xl font-bold">+{stats.categories}</p>
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium text-xs">
                            <FaLongArrowAltUp className="text-green-600 text-sm" />
                            02.5%
                        </div>
                        <p className="text-xs text-gray-500">
                            Total categories this month
                        </p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow flex flex-col  space-x-4">
                    <div className="flex justify-between">
                        <p className="text-md text-gray-600 font-medium ">Products</p>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg">
                            <FiBox className=" text-white text-2xl" />
                        </div>
                    </div>
                    <p className="mt-4 text-4xl font-bold">+{stats.products}</p>
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium text-xs">
                            <FaLongArrowAltUp className="text-green-600 text-sm" />
                            22.5%
                        </div>
                        <p className="text-xs text-gray-500">
                            Total Products this month
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1">
                    <div className="flex justify-between items-center">
                        <p className="text-md font-semibold text-gray-600">Orders</p>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
                            <FiShoppingCart className="text-white text-2xl" />
                        </div>
                    </div>
                    <p className="mt-4 text-4xl font-bold text-gray-800">
                        +{stats.orders}
                    </p>
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium text-xs">
                            <FaLongArrowAltUp className="text-green-600 text-sm" />
                            12.5%
                        </div>
                        <p className="text-xs text-gray-500">Total orders this month</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Sales Overview
                        </h3>
                        <select className="text-sm border border-gray-200 rounded px-3 py-1 bg-white">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <BsGraphUpArrow className="text-gray-300 text-5xl mx-auto" />
                            <p className="text-gray-400 mt-2">
                                Sales chart will appear here
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {[
                            {
                                id: 1,
                                event: "New order #1234",
                                time: "2 min ago",
                                user: "John Doe",
                            },
                            {
                                id: 2,
                                event: "Product added",
                                time: "15 min ago",
                                user: "Jane Smith",
                            },
                            {
                                id: 3,
                                event: "Store registered",
                                time: "1 hour ago",
                                user: "Acme Store",
                            },
                            {
                                id: 4,
                                event: "Payment received",
                                time: "3 hours ago",
                                user: "Mike Johnson",
                            },
                            {
                                id: 5,
                                event: "New customer",
                                time: "5 hours ago",
                                user: "Sarah Williams",
                            },
                        ].map((activity) => (
                            <div key={activity.id} className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <FiTrendingUp className="text-blue-500 text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        {activity.event}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {activity.time} • {activity.user}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View all activity →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashBoardOverView
