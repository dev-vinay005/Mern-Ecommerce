import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { FiPlus, FiX } from "react-icons/fi";
import AddProductForm from "../components/admin/AddProductForm";
import ProductTable from "../components/admin/ProductsTable";
import { useSearchParams } from "react-router-dom";
const Products = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0)

    const [formVisible, setFormVisible] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')

    const handlePageChange = (e) => {
        const pageNo = e.target.textContent
        console.log(pageNo);
        setSearchParams({
            limit: 6,
            page: pageNo
        })
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products/getAllProducts", {
                    params: {
                        category: "allproducts",
                        limit,
                        page
                    }
                });
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [searchParams]);


    return (
        <div className=" relative min-h-screen max-w-7xl m-auto bg-gray-50 p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Product Management
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Manage your product catalog across all stores
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => setFormVisible(true)}
                >
                    <FiPlus className="text-lg" />
                    <span>Add Product</span>
                </button>
            </div>

            {formVisible && (
                <AddProductForm setFormVisible={setFormVisible} />
            )}
            <ProductTable products={products} />

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
    )
};

export default Products;
