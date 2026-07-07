import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import AdminSideBar from '../../admin/AdminSideBar';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const togggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className='mon-h-screen flex flex-col md:flex md:flex-row relative'>
            {/*mobiel toggle button*/}
            <div className='flex justify-between md:hidden p-4 bg-gray-900 text-white z-20'>
                <h1 className='ml-4 text-xl font-medium'>Admin DashBoard</h1>
                <button onClick={togggleSidebar}>
                    <GiHamburgerMenu size={24} />
                </button>
            </div>

            {/*Overlay for mobile sidebar*/}
            {isSidebarOpen && (
                <div className='fixed inset-0 z-10 md:hidden'></div>
            )}
            {/*Sidebar */}
            <div className={`w-64 min-h-screen bg-white absolute md:relative shadow-md transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:block z-20`}>
                {/*AdminSideBar component */}
                <AdminSideBar />
            </div>
            {/*Main content */}
            <div className='flex-grow min-h-screen overflow-auto'>
                <Outlet />
            </div>
        </div >
    )
}

export default AdminLayout
