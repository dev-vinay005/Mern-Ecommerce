import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    FiHome,
    FiTag,
    FiBox,
    FiShoppingCart,
    FiUser,
    FiUsers,
    FiBarChart2,
    FiSettings,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
// import { LuStore } from "react-icons/lu";

const AdminSideBar = () => {
    const navigation = [
        { name: "Dashboard", icon: MdDashboard, url: '/admin/' },
        { name: "Users", icon: FiUsers, url: '/admin/users' },
        // { name: "Categories", icon: FiTag },
        { name: "Products", icon: FiBox, url: '/admin/products?limit=6&page=1' },
        { name: "Orders", icon: FiShoppingCart, url: '/admin/orders' },
        { name: "Analytics", icon: FiBarChart2, url: '/admin/analytics' },
        { name: "Settings", icon: FiSettings, url: '/admin/setting' },
    ]
    return (
        <div className=''>
            <div className="flex items-center h-20 px-6 mb-2">
                <div className="w-9 h-9 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 mr-3 flex items-center justify-center">
                    <FiUsers className="text-white text-xl" />
                </div>
                <h1 className="text-xl font-semibold text-gray-800">
                    <span className="text-[#1D4ED8]">Admin</span>Panel
                </h1>
            </div>

            <nav className='flex flex-col p-4 space-y-1'>
                {navigation.map((links, index) => (
                    <NavLink
                        to={links.url}
                        key={index}
                        end={links.url === '/admin/'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-blue-50 border-r-2 border-[#1D4ED8] text-[#1D4ED8] font-semibold' : 'text-black hover:bg-gray-50 hover:text-gray-700'
                            }`
                        }
                    >
                        <div className="p-1"><links.icon size={20} /></div>
                        <span>{links.name}</span>
                    </NavLink>

                ))}
            </nav>
        </div >
    )
}

export default AdminSideBar
