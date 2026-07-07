import React from 'react'
import {
    FaStar,
    FaRegStar,
    FaShoppingCart,
    FaHeart,
    FaRegEye,
} from "react-icons/fa";
import { Link } from 'react-router-dom';

import { addtoCart } from "../../redux/slices/cartSlice"
import { useDispatch, useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
    const { loading, loadingProductId } = useSelector(
        (state) => state.cartSlice
    );
    const isLoading =
        loading && loadingProductId === product._id;
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full max-w-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative border border-gray-100">
                {/* Product Image Section */}
                <div className="relative flex  justify-center aspect-square overflow-hidden bg-gray-50">
                    {/* Main Image */}
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className=" h-full object-contian transition-all duration-700 group-hover:scale-105"
                    />

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-110">
                        <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>

                    {/* Discount Badge */}
                    {product.discountPrice && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                        </span>
                    )}

                    {/* Stock Status */}
                    <span className={`absolute bottom-3 left-3 text-xs font-medium px-2 py-1 rounded-md ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
                        <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                            <Link to={`/product/${product._id}`}>
                                <button className="bg-white text-gray-800 px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 font-medium text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Quick View
                                </button>
                            </Link>
                            <button className="bg-black text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-900 transition-all duration-200 flex items-center gap-2 font-medium text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="p-5">
                    {/* Category and Rating */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors duration-200 cursor-default">
                            {product.category.name}
                        </span>
                        <div className="flex items-center">
                            <div className="flex text-amber-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({product.numReviews || 0})</span>
                        </div>
                    </div>
                    {/* Product Title */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12 transition-colors duration-200 group-hover:text-blue-600">
                        {product.name}
                    </h3>
                    {/* Product Description */}
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
                        {product.description}
                    </p>
                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-baseline gap-2">
                            {product.discountPrice ? (
                                <>
                                    <span className="font-bold text-xl text-gray-900">
                                        ₹{product.discountPrice.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-gray-400 line-through text-sm">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </span>
                                </>
                            ) : (
                                <span className="font-bold text-xl text-gray-900">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-gray-500">
                                {new Date(product.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 font-medium text-sm ${isLoading
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed shadow-none'
                            : 'bg-gradient-to-r from-gray-900 to-black text-white hover:from-gray-800 hover:to-gray-900 hover:shadow-lg active:scale-95'
                            }`}
                        onClick={async () => {
                            const result = await dispatch(addtoCart({
                                productId: product._id,
                                quantity: 1,
                                sizes: product.sizes[0],
                                color: product.colors,
                                discountPrice: product.discountPrice,
                                guestId: localStorage.getItem('guestId'),
                                userId: JSON.parse(localStorage.getItem('userInfo'))?.userId || null,
                            }));

                        }}
                    >{isLoading ? (
                        <>   <svg
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
                            Adding to Cart...</>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add to Cart
                        </>
                    )}

                    </button>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs text-gray-600">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-xs text-gray-600">Secure</span>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ProductCard
