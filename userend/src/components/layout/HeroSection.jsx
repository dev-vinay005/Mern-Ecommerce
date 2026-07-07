import React from 'react'
import { BsLightningCharge } from "react-icons/bs";
import { FaLongArrowAltRight, FaStar } from "react-icons/fa";
const HeroSection = () => {
    return (
        <section className="bg-[#FAFBFB] pt-8 pb-10">
            <div className="max-w-[1400px] min-h-[100vh] m-auto px-4 md:py-5 flex flex-wrap flex-col flex-col-reverse
 md:flex-row md:flex-nowrap items-center justify-between ">
                <div className="flex flex-col  items-start gap-4 flex-1 ">
                    <h3 className="flex items-center gap-3 text-sm px-3 py-2 mb-6 bg-[#E0E1E3]  rounded-2xl">
                        <BsLightningCharge /> New arrival is available now
                    </h3>
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
                        Shop the Best Products Online
                    </h1>
                    <p className="text-md sm:text-lg leading-loose text-gray-400">
                        Discover premium quality products with lightning-fast
                        delivery. Your satisfaction is our priority with 24/7 support{" "}
                        and hassle-free returns.
                    </p>
                    <div className="flex sm:flex-row w-full  flex-col   items-center gap-4 mt-6">
                        <button className="px-7 py-3 w-full bg-black text-white font-medium rounded-md text-md flex items-center justify-center gap-3 hover:bg-gray-800 transotion-all duration-200 group">
                            Shop Now
                            <FaLongArrowAltRight className="text-sm ront-regular text-white  group-hover:translate-x-1 transotion-all duration-200" />
                        </button>
                        <button className="px-10 py-3 w-full bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200">
                            Learn More
                        </button>
                    </div>

                    <div className="w-full grid sm:grid-cols-1 md:grid-cols-3  mt-10 gap-6">
                        <div className="w-full text-center py-6 px-8 bg-white rounded-lg shadow-md">
                            <h3 className="font-bold text-black text-3xl mb-3">10K+</h3>
                            <p className="text-gray-600">Premium Products</p>
                        </div>
                        <div className="w-full text-center py-6 px-8 bg-white rounded-lg shadow-md">
                            <h3 className="font-bold text-black text-3xl mb-3">50K+</h3>
                            <p className="text-gray-600">Happy Customers</p>
                        </div>
                        <div className="w-full text-center py-6 px-8 bg-white rounded-lg shadow-md">
                            <h3 className="font-bold text-black text-3xl mb-3 flex items-center justify-center gap-2">
                                4.9 <FaStar className="text-yellow-400 text-[18px]" />
                            </h3>
                            <p className="text-gray-600">Customer Rating </p>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden mb-10 mt-25 lg:mb-0 lg:mt-0 lg:flex flex-1 sm:pl-0 md:pl-10">
                    <div className="grid grid-cols-2 gap-4 max-h-[500px] ">
                        <div className="flex flex-col gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                                alt="Hero"
                                className="w-full lg:h-75 object-cover lg:mb-4 rounded-2xl shadow-lg z-20"
                            />
                            <img

                                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&auto=format"
                                alt="Hero"
                                className="w-full lg:h-60 object-cover lg:mb-4 rounded-2xl shadow-lg z-20"
                            />
                        </div>
                        <div className="lg:mt-10 relative flex flex-col gap-4">
                            <div className="absolute z-10 -top-20 -right-3 rounded-2xl px-6 py-4 bg-[#0F172A] text-white animate-bounce">
                                <h3 className="text-sm font-bold mb-1">Free shipping</h3>
                                <p className="text-xs text-gray-400 font-medium">
                                    On order ₹2000+
                                </p>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&auto=format"
                                alt="Hero"
                                className="w-full lg:h-60 object-cover lg:mb-4 rounded-2xl shadow-lg z-20 relative "
                            />

                            <img
                                src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=500&fit=crop&auto=format"
                                alt="Hero"
                                className="w-full lg:h-75 h-40 object-cover lg:mb-4 rounded-2xl shadow-lg z-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
