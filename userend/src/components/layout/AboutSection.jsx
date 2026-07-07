import React from "react";
import { LuTruck, LuShield } from "react-icons/lu";
import { ImHeadphones } from "react-icons/im";
import { RiLoopRightFill } from "react-icons/ri";
import { MdOutlineHeadphones } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";

const AboutSection = () => {
    return (
        <section className="bg-[#FAFBFB] py-17">
            <div className="max-w-[1400px] m-auto px-4">
                <div className="flex flex-col items-center justify-center mb-15 text-center gap-5">
                    <div className="flex items-center gap-2 bg-[#E7E7E9] px-5 py-2 rounded-3xl">
                        ⚡<h3 className="text-sm font-medium">Why Choose Us</h3>
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">
                        Premium Shopping <span className="text-blue-600">Experience</span>
                    </h2>
                    <p className="text-lg text-gray-500">
                        Everything you need for a seamless and delightful shopping journey
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
                    <div className="col-span-1 md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-50 shadow-md shadow-purple-100 transition-all duration-200 hover:-translate-y-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 ">
                            <div className="flex  flex-col gap-2 ">
                                <div className="bg-purple-500/20 mb-2 rounded-2xl w-13 h-13 flex items-center justify-center">
                                    <MdOutlineHeadphones className="text-2xl text-purple-600" />
                                </div>

                                <h2 className="font-bold text-lg">24/7 Expert Support</h2>
                                <p className="text-md text-gray-500">
                                    Our dedicated team is always ready to help you with any
                                    questions or concerns.
                                </p>
                            </div>

                            <div className="flex gap-4 ">
                                <div className="bg-white/80 p-4 rounded-xl text-center shadow-md shadow-purple-200">
                                    <h2 className="text-2xl text-indigo-600 font-bold">24/7</h2>
                                    <p className="text-sm text-gray-500">Support</p>
                                </div>
                                <div className="bg-white/80 p-4 rounded-xl text-center shadow-md shadow-purple-200">
                                    <h2 className="text-2xl text-indigo-600 font-bold">95%</h2>
                                    <p className="text-sm text-gray-500">Satisfaction</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" md:row-start-2 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-50 shadow-md shadow-green-100 transition-all duration-200 hover:-translate-y-2">
                        <div className="flex  flex-col gap-2">
                            <div className="bg-green-500/20 mb-2 rounded-2xl w-13 h-13 flex items-center justify-center">
                                <LuShield className="text-2xl text-green-600" />
                            </div>
                            <h2 className="font-bold text-lg">Bank-Level Security</h2>
                            <p className="text-sm text-gray-500">
                                Your payments protected with enterprise-grade encryption.
                            </p>
                        </div>
                    </div>

                    <div className=" md:row-start-2 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50 shadow-md shadow-blue-100 transition-all duration-200 hover:-translate-y-2">
                        <div className="flex  flex-col gap-2">
                            <div className="bg-blue-500/20 mb-2 rounded-2xl w-13 h-13 flex items-center justify-center">
                                <RiLoopRightFill className="text-2xl text-blue-600" />
                            </div>
                            <h2 className="font-bold text-lg">Easy Returns</h2>
                            <p className="text-sm text-gray-500">
                                30-day hassle-free returns with full refund guarantee.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 md:row-span-2 rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-blue-50 shadow-md shadow-blue-100 transition-all duration-200 hover:-translate-y-2">
                        <div className="flex flex-col h-full justify-between gap-3 ">
                            <div>
                                <div className="bg-blue-500/10 mb-4 rounded-2xl w-18 h-18 flex items-center justify-center">
                                    <LuTruck className="text-4xl text-blue-600" />
                                </div>
                                <h2 className="font-bold text-2xl">Lightning Fast Delivery</h2>
                                <p className=" text-gray-500 text-md">
                                    Same-day delivery available in major cities. Free shipping on
                                    orders over $50. Track your orders in real-time with our
                                    advanced logistics system.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/80 p-4 rounded-xl text-center shadow-lg shadow-blue-100">
                                    <h2 className="text-xl text-blue-600 font-bold">2hr</h2>
                                    <p className="text-xs text-gray-500">Express Delivery</p>
                                </div>
                                <div className="bg-white/80 p-4 rounded-xl text-center shadow-lg shadow-blue-100">
                                    <h2 className="text-xl text-blue-600 font-bold">Free</h2>
                                    <p className="text-xs text-gray-500">Over $50</p>
                                </div>
                                <div className="bg-white/80 p-4 rounded-xl text-center shadow-lg shadow-blue-100">
                                    <h2 className="text-xl text-blue-600 font-bold">98%</h2>
                                    <p className="text-xs text-gray-500">On-Time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
