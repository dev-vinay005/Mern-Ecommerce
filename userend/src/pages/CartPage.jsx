import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, removeItemFromCart, updateCartItemQuantity } from '../redux/slices/cartSlice'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import { Link } from 'react-router-dom'
import {
    FaArrowLeft,
    FaArrowRight,
    FaStar,
    FaRegStar,
    FaMinus,
    FaPlus,
    FaRegTrashAlt,
} from "react-icons/fa";
import { LuTags, LuShield, LuCreditCard } from "react-icons/lu";
import { LuTruck } from "react-icons/lu";
import { RiLoopRightLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";

const CartPage = () => {
    const isLoading = false
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cartSlice.cart)
    const { user, guestId } = useSelector((state) => state.authSlice)
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || "null")
    const userId = userInfo?.userId || null
    const { cart } = useSelector((state) => state.cartSlice)

    useEffect(() => {
        dispatch(fetchCart({ userId }))
    }, [dispatch])

    return (
        <div>
            <div className="max-w-[1400px] w-full m-auto px-4 py-14">
                {cartItems.products.length === 0 ? (
                    <div className="w-full min-h-[65vh] flex flex-col text-center items-center justify-center gap-4">
                        <FiShoppingBag className="text-[#64748B] text-6xl" />
                        <h2 className="text-4xl font-bold mt-6">Your Cart is empty</h2>
                        <p className="text-lg text-[#64748B] mt-2 ">
                            Discover amazing products and start building your
                            <br /> perfect collection today!
                        </p>
                        <button className="bg-black text-white text-lg px-10 py-2 rounded-md mt-2 hover:bg-gray-800 transition duration-300">
                            <Link to="/">Start Shopping</Link>
                        </button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <h2 className="text-5xl font-bold">Shopping Cart</h2>
                            <p className="mt-4 text-gray-600 text-lg">
                                {cartItems.products.length} Items in your cart
                            </p>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-10 items-center xl:items-start justify-center mt-8">
                            <div className="flex-1 xl:flex-2 ">
                                <Link to="/">
                                    <button className="px-7 py-3 mb-8 border-1 border-gray-300 font-medium rounded-md text-sm flex items-center gap-4 hover:bg-[#F1F5F9] transotion-all duration-200 group">
                                        <FaArrowLeft className="text-xs ront-regular text-gray-800  group-hover:-translate-x-1 transotion-all duration-200" />
                                        Continue Shopping
                                    </button>
                                </Link>
                                <div className=" shadow-lg bg-white rounded-xl overflow-x-auto">
                                    <div className=" px-8 py-6 border-b-1 border-gray-200">
                                        <h2 className="flex items-center gap-4 text-2xl font-medium  ">
                                            <FiShoppingBag /> Your Cart items
                                        </h2>
                                    </div>
                                    {cartItems.products.map((cartItem) => (
                                        <div className="px-8 py-10 border-b-1 border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-7">
                                            <div className="flex gap-4 items-center">
                                                <div className="h-30 w-35  overflow-hidden flex justify-center items-center">
                                                    <img
                                                        src={cartItem.image}
                                                        className=" min-w-25 h-full object-fit"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <h2 className="font-bold text-xl">
                                                        {`${cartItem.name.split(" ").slice(0, 4).join(" ")}...`}
                                                    </h2>


                                                    <div className="flex items-center">
                                                        <div className="flex text-yellow-400 mr-1">
                                                            <FaStar className="text-xs" />
                                                            <FaStar className="text-xs" />
                                                            <FaStar className="text-xs" />
                                                            <FaStar className="text-xs" />
                                                            <FaRegStar className="text-xs" />

                                                            <span className="text-gray-500 text-xs">
                                                                (128 reviews)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-baseline gap-2">
                                                        {cartItem.discountPrice ? (
                                                            <>
                                                                <span className="font-bold text-xl text-gray-900">
                                                                    ₹{cartItem.discountPrice.toLocaleString('en-IN')}
                                                                </span>
                                                                <span className="text-gray-400 line-through text-sm">
                                                                    ₹{cartItem.price.toLocaleString('en-IN')}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="font-bold text-xl text-gray-900">
                                                                ₹{cartItem.price.toLocaleString('en-IN')}
                                                            </span>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="flex text-center">
                                                <div className=" flex flex-col items-center  text-center ">
                                                    <p className="font-medium text-md mb-4">Quantity:</p>
                                                    <div className="flex border-1 border-gray-300 rounded-lg overflow-hidden">
                                                        <button className="cursor-pointer flex items-center justify-center w-11 h-10 bg-[#F1F5F9] "
                                                            onClick={
                                                                () => {
                                                                    dispatch(updateCartItemQuantity({
                                                                        productId: cartItem.productId,
                                                                        sizes: cartItem.sizes,
                                                                        quantity: cartItem.quantity - 1,
                                                                        userId: user ? user.userId : null,
                                                                        guestId: guestId
                                                                    }))
                                                                }
                                                            }
                                                        >
                                                            <FaMinus
                                                                size={12}
                                                            />
                                                        </button>
                                                        <span className="flex items-center justify-center w-11 h-10 text-md">
                                                            {cartItem.quantity}
                                                        </span>
                                                        <button className="cursor-pointer flex items-center justify-center w-11 h-10 bg-[#F1F5F9]"
                                                            onClick={() => {
                                                                dispatch(updateCartItemQuantity({
                                                                    productId: cartItem.productId,
                                                                    sizes: cartItem.sizes,
                                                                    quantity: cartItem.quantity + 1,
                                                                    userId: user ? user.userId : null,
                                                                    guestId: guestId
                                                                }))
                                                            }}>
                                                            <FaPlus
                                                                size={12}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center  text-center pl-10 pr-6">
                                                    <h2 className="mb-4 font-medium text-md">Total</h2>
                                                    <h3 className="font-bold text-2xl">
                                                        ₹
                                                        {(
                                                            cartItem.discountPrice * cartItem.quantity
                                                        ).toLocaleString("en-IN")}
                                                    </h3>
                                                </div>

                                                <div className="flex">
                                                    <button
                                                        onClick={() => {
                                                            dispatch(removeItemFromCart({
                                                                productId: cartItem.productId,
                                                                sizes: cartItem.sizes,
                                                                userId: user ? user.userId : null,
                                                                guestId: guestId
                                                            }))
                                                        }}
                                                        className='cursor-pointer'
                                                    >
                                                        <FaRegTrashAlt className="text-red-600 ml-6" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-7 grid grid-cols-3 gap-5">
                                    <div className=" bg-gradient-to-br from-green-50 to-green-100/50 flex flex-col items-center justify-center py-4">
                                        <LuTruck className="text-green-600 text-3xl mb-2" />
                                        <p className="text-md font-medium text-green-800">
                                            Fast Delivery
                                        </p>
                                        <span className="text-xs mt-1 text-green-600">
                                            3-5 business days
                                        </span>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 flex flex-col items-center justify-center py-4">
                                        <LuShield className="text-blue-600 text-3xl mb-2" />
                                        <p className="text-md font-medium text-blue-800">Secure</p>
                                        <span className="text-xs mt-1 text-blue-600">
                                            256-bit SSL encryption
                                        </span>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 flex flex-col items-center justify-center py-4">
                                        <RiLoopRightLine className="text-purple-600 text-3xl mb-2" />
                                        <p className="text-md font-medium text-purple-800">
                                            Easy return
                                        </p>
                                        <span className="text-xs mt-1 text-purple-600">
                                            30-day return policy
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 rounded-lg shadow-lg sticky top-20 overflow-hidden ">
                                <h2 className="flex items-center p-7 font-medium text-2xl gap-3 bg-gray-200">
                                    <LuTags className="text-3xl" />
                                    Order Summery
                                </h2>
                                <div className="shadow-sm flex flex-col items-center bg-[#F2F3F4] pt-2 pb-7 p-5">
                                    <div className="w-full p-4 flex items-center justify-between border-b-1 border-gray-200">
                                        <p className="text-gray-500 text-lg">
                                            Subtotal ({cartItems.products.length} items)
                                        </p>
                                        <h2 className="text-lg">
                                            ₹{cartItems.totalPrice.toLocaleString("en-IN")}
                                        </h2>
                                    </div>
                                    <div className="w-full p-4 flex items-center justify-between border-b-1 border-gray-200">
                                        <p className="text-gray-500 text-lg">
                                            Shipping
                                            <span className="ml-1 text-xs text-green-800 bg-green-100 py-1 px-3 rounded-2xl font-medium">
                                                Free
                                            </span>
                                        </p>
                                        <h2 className="text-lg">₹0.00</h2>
                                    </div>
                                    <div className="w-full p-4 flex items-center justify-between border-b-1 border-gray-200">
                                        <p className="text-gray-500 text-lg">Tax (2%)</p>
                                        <h2 className="text-lg">
                                            ₹{(cartItems.totalPrice * 0.02).toLocaleString("en-IN")}
                                        </h2>
                                    </div>
                                    <div className="w-full p-5 flex items-center justify-between border-b-1 border-gray-200">
                                        <p className="text-2xl font-bold">Total</p>
                                        <h2 className="text-2xl font-bold">
                                            ₹{(cartItems.totalPrice + (cartItems.totalPrice * 0.02)).toLocaleString("en-IN")}
                                        </h2>
                                    </div>
                                    <Link to="/cart/checkout">
                                        <button
                                            className="px-7 py-3 mt-8 bg-black text-white font-medium rounded-md text-lg flex items-center justify-center gap-4 hover:bg-gray-800 transition-all duration-200 group "
                                        >
                                            {isLoading ? (
                                                <>
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
                                                </>
                                            ) : (
                                                <>
                                                    Proceed for Checkout
                                                    <FaArrowRight className="text-xs font-regular text-white group-hover:translate-x-1 transition-all duration-200" />
                                                </>
                                            )}
                                        </button>
                                    </Link>

                                    <p className="flex items-center gap-4 my-7">
                                        <LuShield className="text-green-600" />
                                        <span className="text-sm text-gray-500">
                                            Your payment information is secure and encrypted
                                        </span>
                                    </p>
                                    <div className="flex justify-between gap-5">
                                        <div className="flex flex-col gap-2 items-center justify-center w-23 h-18 bg-gray-50 rounded-md">
                                            <LuShield className="text-green-600 text-xl" />
                                            <p className="text-gray-500 text-xs">Secure</p>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center justify-center w-23 h-18 bg-gray-50 rounded-md">
                                            <LuTruck className="text-blue-600 text-xl" />
                                            <p className="text-gray-500 text-xs">Fast Delivery</p>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center justify-center w-23 h-18 bg-gray-50 rounded-md">
                                            <RiLoopRightLine className="text-purple-600 text-xl" />
                                            <p className="text-gray-500 text-xs">Easy return</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div >
    );
}

export default CartPage
