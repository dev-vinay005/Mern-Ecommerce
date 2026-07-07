import React from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-300 text-gray-700 py-12 px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand Section */}
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-[#0F172A] text-white flex items-center justify-center rounded-lg font-bold text-xl">
                            E
                        </div>
                        <span className="text-2xl font-bold text-black">EliteStore</span>
                    </div>

                    <p className="text-sm leading-6">
                        Your trusted online marketplace for electronics, clothing, furniture, and medical supplies.
                    </p>

                    <div className="flex space-x-5 mt-5 text-xl">
                        <FiFacebook className="hover:text-blue-600 cursor-pointer" />
                        <FiTwitter className="hover:text-blue-600 cursor-pointer" />
                        <FiInstagram className="hover:text-blue-600 cursor-pointer" />
                        <FiYoutube className="hover:text-blue-600 cursor-pointer" />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-blue-600 cursor-pointer">About Us</li>
                        <li className="hover:text-blue-600 cursor-pointer">Contact</li>
                        <li className="hover:text-blue-600 cursor-pointer">FAQ</li>
                        <li className="hover:text-blue-600 cursor-pointer">Shipping Info</li>
                        <li className="hover:text-blue-600 cursor-pointer">Returns</li>
                        <li className="hover:text-blue-600 cursor-pointer">Size Guide</li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Categories</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-blue-600 cursor-pointer">Electronics</li>
                        <li className="hover:text-blue-600 cursor-pointer">Clothing</li>
                        <li className="hover:text-blue-600 cursor-pointer">Furniture</li>
                        <li className="hover:text-blue-600 cursor-pointer">Medical</li>
                        <li className="hover:text-blue-600 cursor-pointer">Sale Items</li>
                        <li className="hover:text-blue-600 cursor-pointer">New Arrivals</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                    <p className="text-sm mb-4">Subscribe to get updates on new products and exclusive offers.</p>

                    <div className="flex bg-white   w-full mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 mr-2 outline-none text-sm"
                        />
                        <button className="bg-blue-600 text-white rounded-lg px-4 text-sm hover:bg-blue-700">Subscribe</button>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-3">
                            <FiPhone />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FiMail />
                            <span>support@elitestore.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FiMapPin />
                            <span>123 Business St, City, State 12345</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-10 border-gray-300" />

            {/* Bottom Bar */}
            <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 px-2">
                <p>© 2024 EliteStore. All rights reserved.</p>

                <div className="flex space-x-6 mt-3 sm:mt-0">
                    <span className="hover:text-blue-600 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-blue-600 cursor-pointer">Terms of Service</span>
                    <span className="hover:text-blue-600 cursor-pointer">Cookie Policy</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
