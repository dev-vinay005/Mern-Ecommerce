"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { MdOutlinePhone } from "react-icons/md";
import { HiOutlineSelector } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

export default function Registration() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const authState = useSelector((state) => state.authSlice);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(registerUser(formData));
        setFormData({
            name: "",
            email: "",
            password: "",
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 animate-fade-in">
                <div className="text-center mb-6">
                    <div className="w-14 h-14 mx-auto font-bold text-xl bg-[#262D3F] text-white flex items-center justify-center rounded-full mb-3 animate-spin-slow">
                        E
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Register As Admin
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Create your account in minutes
                    </p>
                </div>

                {authState.error && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
                        {authState.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        {
                            name: "name",
                            placeholder: "Full Name",
                            icon: <FiUser className="mr-3 text-xl text-gray-600" />,
                            type: "text",
                        },
                        {
                            name: "email",
                            placeholder: "Email Address",
                            icon: (
                                <MdOutlineMailOutline className="mr-3 text-xl text-gray-600" />
                            ),
                            type: "email",
                        },
                        {
                            name: "password",
                            placeholder: "Password",
                            icon: <GoLock className="mr-3 text-xl text-gray-600" />,
                            type: "password",
                        }
                    ].map(({ name, placeholder, icon, type }) => (
                        <div className="relative flex items-center bg-white rounded-lg px-3 py-3 border border-gray-200 focus-within:ring-1 focus-within:ring-[#0F172A] transition-all duration-300">
                            {icon}
                            <input
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                value={formData[name]}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
                            />
                        </div>
                    ))}

                    {/* <div className="relative bg-gray-50 rounded-lg px-3 py-3 border border-gray-200 focus-within:ring-1 focus-within:ring-[#0F172A] transition-all duration-300">
                        <div className="flex items-center">
                            <HiOutlineSelector />
                            <select
                                name="gender"
                                value={formData["gender"]}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div> */}
                    <button
                        type="submit"
                        disabled={authState.loading}
                        className={`w-full bg-[#262D3F] text-white py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {authState.loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-4 w-4 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                                    ></path>
                                </svg>
                                Registering...
                            </span>
                        ) : (
                            "Register"
                        )}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/loginuser"
                            className="text-[#262D3F] font-bold hover:underline transition-colors"
                        >
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
