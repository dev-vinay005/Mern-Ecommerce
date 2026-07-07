
import axios from "axios";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductTable = ({ products }) => {
    const handleDeleteProduct = async (productId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/products/deleteProduct/${productId}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
        } catch (err) {
            console.log(err);

        }

    }
    return (
        <div className="p-8 pb-2 bg-gray-100">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-2">
                        All Products
                        <span className="text-sm text-gray-500">
                            ({products.length} item in your store)
                        </span>
                    </h1>
                    <p className="text-sm text-gray-500">
                        Complete list of products in your e-commerce platform
                    </p>
                </div>
                <div className="flex items-center border border-gray-500 rounded-lg px-4 py-2 focus-within:border-gray-700 focus-within:border-2 transition">
                    <i className="fa-solid fa-magnifying-glass mr-3 text-sm text-gray-400"></i>
                    <input
                        className="outline-none w-full text-sm text-gray-700"
                        name="searchProducts"
                        type="text"
                        placeholder="Search Products..."
                    // onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="mb-12 mt-8">
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    No.
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pricing
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  divide-gray-200">
                            {products.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className="border-b-1 border-gray-200 hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                        {index + 1}.
                                    </td>

                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="w-14 h-16 rounded overflow-hidden">
                                            <img
                                                className="w-full h-full rounded object-fit"
                                                src={product?.images[0]?.url}
                                                alt={product.altText}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {product.name.split(" ").slice(0, 4).join("-")}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {product.description.length > 30
                                                ? `${product.description.slice(0, 30)}...`
                                                : product.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                        {product._id.length > 8
                                            ? `${product._id.slice(0, 12)}...`
                                            : product._id}
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <span className="text-gray-400 line-through mr-2">
                                                ₹{product.price}
                                            </span>
                                            <span className="font-semibold text-green-600">
                                                ₹{product.discountPrice}
                                            </span>
                                        </div>
                                        <div className="text-xs text-white bg-red-500 rounded-full px-2 py-0.5 inline-block mt-1">
                                            10% OFF
                                        </div>

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-4">
                                            <Link to={`/admin/products/${product._id}`}>
                                                <button className="text-yellow-600 hover:text-yellow-900">
                                                    <FaEdit className="h-5 w-5" />
                                                </button>
                                            </Link>
                                            <button className="text-red-600 hover:text-red-900" onClick={() => {
                                                handleDeleteProduct(product._id)
                                            }}>
                                                <FaTrashAlt className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default ProductTable;
