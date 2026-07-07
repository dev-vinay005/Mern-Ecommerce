import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../redux/slices/productSlice";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import ProductCard from "../components/layout/ProductCard";
import { useSearchParams } from "react-router-dom";


const ProductsPage = () => {
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get("category") || "allproducts"
    const limit = searchParams.get("limit") || "6"
    const page = searchParams.get("page") || "1"
    const dispatch = useDispatch();
    const { products, totalPages } = useSelector((state) => state.productSlice);

    console.log(category,
        limit,
        page);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories/getAllCategories`);
                setCategories(response.data.categories || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        }

        fetchCategories();
        dispatch(fetchAllProduct({
            category: category || "allproducts",
            limit: limit || "6",
            page: page || "1"
        }));
    }, [searchParams]);

    const handlePageChange = (e) => {
        const pageNo = e.target.textContent
        setSearchParams({
            category: category || "allproducts",
            limit: limit || "6",
            page: pageNo.toString()
        })
    }

    const handleLimitChange = (limitValue) => {
        setSearchParams({
            category: category || "allproducts",
            limit: limitValue || "6",
            page: 1
        })
    }

    return (
        <section className="bg-[#FAFBFB] py-12">

            <div className="max-w-[1400px]   m-auto px-4">
                <div className="flex  gap-5 justify-between items-start sm:items-center">
                    <div>
                        <h2 className="text-3xl font-bold">All Products</h2>
                        <div className="flex items-center gap-3 border border-gray-300 max-w-full sm:max-w-[400px] py-2 px-3 mt-5 rounded-md focus-within:border-black">
                            <IoSearchOutline className="text-md" />
                            <input
                                type="text"
                                placeholder="Search products.."
                                className="text-sm outline-none w-full"
                            />
                        </div>

                    </div>

                    <div className="flex">
                        <h3 className="px-3 py-1 text-sm sm:text-md sm:px-5 sm:py-2 bg-[#0F172A] text-white sm:rounded-bl-2xl ">Limit</h3>
                        <div className="relative h-full ">
                            <select
                                name=""
                                value={limit}
                                id=""
                                onChange={(e) => handleLimitChange(e.target.value)}
                                className="appearance-none  px-3 py-1 text-sm sm:text-md sm:px-5 sm:py-2 border border-l-0 rounded-tr-xl  rounded-br-xl sm:rounded-br-none sm:rounded-tr-2xl  pr-5 sm:pr-8 focus:none outline-none"
                            >
                                <option value="0">0</option>
                                <option value="6">6</option>
                                <option value="12">12</option>
                                <option value="18">18</option>
                                <option value="24">24</option>
                            </select>

                            {/* Custom Dropdown Arrow Icon */}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-start flex-col lg:flex-row gap-8 mt-5">
                    <div className="w-full lg:w-1/4 border border-gray-300 rounded-lg p-6">
                        <h2 className="text-lg font-medium">Filters</h2>
                        <div className="mt-5">
                            <h3 className="text-md font-medium">Category</h3>
                            <div className="flex gap-2 flex-wrap mt-2">
                                <button
                                    className="text-sm font-medium rounded-lg py-2 px-3 border border-gray-300 hover:bg-gray-100 transition-all duration-300"
                                    onClick={() => setSearchParams({ category: "allproducts", limit: "6", page: '1' })}
                                >

                                    All
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        className="text-sm font-medium rounded-lg py-2 px-3 border border-gray-300 hover:bg-gray-100 transition-all duration-300" onClick={() => setSearchParams({ category: category.name, limit: "6", page: '1' })}>
                                        {category.name.toLowerCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Section */}
                    <div className="w-full lg:w-3/4">
                        <p className="text-md text-gray-500">
                            Showing <span>{products.length}</span> Products
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">

                            {
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))
                            }

                        </div>
                    </div>


                </div>
                <div className="flex gap-4  mt-10 items-center justify-center ">
                    {
                        Array(totalPages).fill('null').map((_, index) => {
                            const currentPage = index + 1

                            return (<button onClick={(e) => handlePageChange(e)} className={`px-3 py-1 border transition-all duration-300 rounded-md
            ${Number(page) === currentPage
                                    ? "bg-black text-white border-black"
                                    : "border-gray-300 hover:bg-gray-100"
                                }`}
                            >{index + 1}</button>)
                        })
                    }

                </div>
            </div>
        </section >
    );
};

export default ProductsPage;
