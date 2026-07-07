import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchSingleProduct } from '../redux/slices/productSlice'
import { AiOutlineHeart, AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineShareAlt } from 'react-icons/ai'
import { BsShieldCheck, BsTruck, BsTag } from 'react-icons/bs'
import { TbArrowBack } from 'react-icons/tb'
import {
    FaRegStar, FaStarHalfAlt, FaStar,
    FaMinus,
    FaPlus
} from 'react-icons/fa'
import { RiLoopRightLine } from 'react-icons/ri'
import { LuShield, LuTruck } from 'react-icons/lu'
import { addtoCart } from '../redux/slices/cartSlice'

const SingleProductPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        dispatch(fetchSingleProduct(params.productId))
    }, [dispatch, params.productId])

    const product = useSelector((state) => state.productSlice.singleProduct)
    const loading = useSelector((state) => state.productSlice.loading)
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
                    <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
                    <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        Return to Shop
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <section className="bg-white min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6 md:mb-8">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li>
                                <Link to="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                                    <TbArrowBack className="w-4 h-4 mr-2" />
                                    Back to Products
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">/</span>
                                    <span className="text-sm font-medium text-gray-900 capitalize">
                                        {product.category?.name || 'Category'}
                                    </span>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">/</span>
                                    <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                        {product.name}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Product Images */}
                    <div className="lg:flex-1">
                        <div className="sticky top-4">
                            {/* Main Image */}
                            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-8 mb-4 md:mb-6 border border-gray-100">
                                <div className="aspect-square relative overflow-hidden rounded-lg md:rounded-xl">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={product.images[selectedImage]?.url || product.images[0]?.url}
                                        alt={product.images[selectedImage]?.altText || product.name}
                                    />
                                    {product.isFeatured && (
                                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            FEATURED
                                        </span>
                                    )}
                                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                                        <AiOutlineHeart className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-red-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={image._id || index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-1 h-20 md:h-24 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === index ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <img
                                            className="w-full h-full object-cover"
                                            src={image.url}
                                            alt={image.altText || `${product.name} view ${index + 1}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:flex-1">
                        <h3 className="text-sm rounded-2xl bg-gray-100 inline-block px-4 py-2 mb-4 font-medium text-gray-900 capitalize">{product.category?.name} </h3>
                        <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                        <div className="flex items-center mt-4 mb-3">
                            <div className="flex text-yellow-400 mr-2 ">
                                <FaStar className="text-lg" />
                                <FaStar className="text-lg" />
                                <FaStar className="text-lg" />
                                <FaStar className="text-lg" />
                                <FaRegStar className="text-lg" />
                            </div>
                            <span className="text-gray-600 text-md">
                                4.8 (128 reviews)
                            </span>
                        </div>
                        <div className='flex gap-3 mb-4'>
                            <h3 className="text-2xl font-bold text-[#3c83f6]">${product.discountPrice.toFixed(2)}</h3>
                            <h3 className="text-lg font-semibold  line-through text-gray-400">${product.price.toFixed(2)}</h3>
                        </div>
                        <p className="text-gray-600">
                            Experience premium quality with this exceptional product. Crafted with attention to detail and designed for those who appreciate excellence. Perfect for everyday use or special occasions.
                        </p>
                        <div className='w-full h-[1px] bg-gray-300 my-7' > </div>

                        <div className=" flex  items-center gap-5  text-center ">
                            <p className="font-medium text-md ">Quantity:</p>
                            <div className="flex border-1 border-gray-300 rounded-lg overflow-hidden">
                                <button className="cursor-pointer flex items-center justify-center w-11 h-10 bg-[#F1F5F9] "

                                >
                                    <FaMinus
                                        size={12}
                                    />
                                </button>
                                <span className="flex items-center justify-center w-11 h-10 text-md">
                                    1
                                </span>
                                <button className="cursor-pointer flex items-center justify-center w-11 h-10 bg-[#F1F5F9]"
                                >
                                    <FaPlus
                                        size={12}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className='flex mt-5 gap-4'>
                            <button className=" cursor-pointer flex-1 flex justify-center items-center gap-2 bg-[#3c83f6] text-white px-5 py-3 rounded-lg hover:bg-[#3c83f6]/90 transition-colors"
                                onClick={() => dispatch(addtoCart({
                                    productId: product._id,
                                    quantity: 1,
                                    price: product.discountPrice,
                                    name: product.name,
                                    sizes: product.sizes[0],
                                    image: product.images[0]?.url || '',
                                    userId: JSON.parse(localStorage.getItem('userInfo'))?.userId || null
                                }))}>
                                <AiOutlineShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className=" cursor-pointer bg-[#F1F5F9]  px-5 py-3 rounded-lg hover:bg-[#F1F5F9]/90 transition-colors">
                                <AiOutlineHeart className="w-5 h-5" />

                            </button>
                            <button className=" cursor-pointer bg-[#F1F5F9]  px-5 py-3 rounded-lg hover:bg-[#F1F5F9]/90 transition-colors">
                                <AiOutlineShareAlt className="w-5 h-5" />

                            </button>
                        </div>

                        <div className='w-full h-[1px] bg-gray-300 my-7' > </div>

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
                </div>
            </div>
        </section>
    )
}

export default SingleProductPage