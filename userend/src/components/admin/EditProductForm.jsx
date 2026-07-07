import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

const EditProductForm = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        countInStock: "",
        sku: "",
        category: "",
        sizes: [],
        tags: [],
        gender: "",
        isFeatured: false,
        isPublished: false,
    });

    const [images, setImages] = useState(
        Array.from({ length: 4 }, () => ({
            imageUrl: null,
            file: null
        }))
    );

    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchProductDeatils = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/getSingleProduct/${productId}`)
                setFormData({
                    name: res.data.product.name,
                    description: res.data.product.description,
                    price: res.data.product.price,
                    discountPrice: res.data.product.discountPrice,
                    countInStock: res.data.product.countInStock,
                    sku: res.data.product.sku,
                    category: res.data.product.category._id,
                    sizes: res.data.product.sizes,
                    tags: res.data.product.tags,
                    gender: res.data.product.gender,
                    isFeatured: res.data.product.isFeatured,
                    isPublished: res.data.product.isPublished,

                })

                setImages(res.data.product.images.map(image => ({ imageUrl: image.url, file: null })))
            } catch (err) {
                console.log(err);
            }
        }
        fetchProductDeatils()
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev => (
            { ...prev, [name]: type === "checkbox" ? checked : value }
        )))
    }
    const handleArrayChange = (e) => {
        const { name, value } = e.target
        const arr = value.split(',').map(elm => elm.trim())
        setFormData((prev => (
            { ...prev, [name]: arr }
        )))
    }

    const handleImageChange = (e, index) => {
        const { files } = e.target
        const file = files[0]
        const imageUrl = URL.createObjectURL(file)
        setImages((prev => (
            prev.map((img, i) => (
                index === i ? (
                    {
                        imageUrl: imageUrl,
                        file: file,
                        index: index
                    }
                ) : (img)
            ))
        )))

    }

    const handleImageRemove = (index) => {
        setImages((prev) => (
            prev.map((img, i) => (
                index === i ? ({
                    imageUrl: null,
                    file: null
                }) : (img)
            ))
        ))
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const productData = new FormData()
        productData.append('name', formData.name)
        productData.append('description', formData.description)
        productData.append('price', formData.price)
        productData.append('discountPrice', formData.discountPrice)
        productData.append('countInStock', formData.countInStock)
        productData.append('sku', formData.sku)
        productData.append('category', formData.category)
        productData.append('sizes', JSON.stringify(formData.sizes))
        productData.append('tags', JSON.stringify(formData.tags))
        productData.append('gender', formData.gender)
        productData.append('isFeatured', formData.isFeatured)
        productData.append('isPublished', formData.isPublished)

        images.map(image => {
            if (image.file) {
                productData.append('images', image.file)
                productData.append('imageIndex', image.index)
            }
        })

        try {
            setLoading(true);
            setMessage("")
            const res = await axios.put(`http://localhost:5000/api/products/editProduct/${productId}`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGIyMTI1ZWJiZWZlODhlMmY2YTQ4MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDE3MjI4NSwiZXhwIjoxNzY0Nzc3MDg1fQ.dg8j3MckEhIJauhQmXNIkYg6gyTTCtIYYjv4RVpVUUw'
                }
            })
            setLoading(false);
            setMessage(res.data.message);
            navigate(`/admin/products`)
        } catch (err) {
            setMessage(err.response.data.message);
            setLoading(false)
        }
    }


    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <div className="relative max-w-2xl mx-auto mt-10 bg-white text-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200">


                <h2 className="text-2xl font-bold mb-7 text-center text-blue-700">
                    🛍️ Create New Product
                </h2>

                {message && (
                    <p
                        className={`mb-4 font-medium text-center ${message.includes("✅") ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
                    {/* Basic Info */}
                    <div className="col-span-2">
                        <h2 className="mb-2">Upload Images</h2>
                        <div className=" flex  gap-5">
                            {
                                images?.map((img, index) => (
                                    <div key={index} >
                                        {img?.imageUrl ? (
                                            <div className="relative w-20 m-h-20 h-full flex justify-center  gap-4">
                                                <img src={img.imageUrl} alt={`Image ${index}`} className="w-20 max-h-20" />
                                                <span className="absolute z-10 -top-1 -right-1 text-white bg-red-500 rounded-full w-[15px] h-[15px] flex items-center justify-center cursor-pointer" onClick={() => {
                                                    handleImageRemove(index)
                                                }}><MdClose size={10} /></span>
                                            </div>
                                        ) : (<label className="w-full h-[100px] cursor-pointer  justify-center text-sm text-gray-600">
                                            <img src="/upload.png" alt="" className="w-20 max-h-20" />
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleImageChange(e, index)}
                                            />
                                        </label>)}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData?.name}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    // required
                    />

                    <input
                        type="text"
                        name="sku"
                        placeholder="SKU"
                        value={formData?.sku}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData?.description}
                        onChange={handleChange}
                        className="col-span-2 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    ></textarea>

                    {/* Pricing */}
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData?.price}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    // required
                    />

                    <input
                        type="number"
                        name="discountPrice"
                        placeholder="Discount Price"
                        value={formData?.discountPrice}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Inventory */}
                    <input
                        type="number"
                        name="countInStock"
                        placeholder="Stock Count"
                        value={formData?.countInStock}
                        onChange={handleChange}
                        className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />


                    <select
                        className="p-2 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                        name="category"
                        value={formData?.category}
                        onChange={handleChange}>
                        <option value="">Select Category</option>
                        {
                            category.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))
                        }
                    </select>

                    <input
                        type="text"
                        name="sizes"
                        placeholder="Sizes (comma separated)"
                        value={formData?.sizes}
                        onChange={handleArrayChange}
                        className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags (comma separated)"
                        value={formData?.tags}
                        onChange={handleArrayChange}
                        className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Gender */}
                    <select
                        name="gender"
                        value={formData?.gender}
                        onChange={handleChange}
                        className="col-span-2 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Gender</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="unisex">Unisex</option>
                    </select>

                    {/* Flags */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData?.isFeatured}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label>Featured Product</label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={formData?.isPublished}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label>Publish Product</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded mt-3 transition-all duration-200"
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </form >
            </div >
        </div>
    );
}

export default EditProductForm
