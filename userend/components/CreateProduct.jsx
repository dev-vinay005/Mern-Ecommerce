import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
const CreateProduct = () => {
    const data = new FormData()
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

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [images, setImages] = useState(
        Array.from({ length: 4 }, () => ({
            imageUrl: null,
            file: null
        }))
    );
    const [category, setCategory] = useState([])

    // 🔹 Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    //handle array inputs

    const handleArrayChange = (e) => {
        const { name, value } = e.target
        const arr = value.split(',').map(elm => elm.trim())
        setFormData((prev => (
            { ...prev, [name]: arr }
        )))
    }
    //handle multiple images 
    const handleImageChange = (e, index) => {
        const { files } = e.target
        const file = files[0]
        const imageUrl = URL.createObjectURL(file)
        let tempImages = [...images]
        tempImages[index] = { imageUrl, file }
        setImages(tempImages)
    }

    const handleImageRemove = (index) => {
        // console.log(index);
        setImages((prevImg) => (
            prevImg.map((img, i) => (
                i === index ? { imageUrl: null, file: null } : (img)
            )
            ))
        )
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories/getAllCategories')
                setCategory(res.data.categories)
            } catch (err) {
                console.log(err);
            }
        }
        fetchCategories()


    }, [])


    const handleSubmit = async (e) => {
        console.log(formData);

        e.preventDefault();
        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('price', formData.price)
        data.append('discountPrice', formData.discountPrice)
        data.append('countInStock', formData.countInStock)
        data.append('sku', formData.sku)
        data.append('category', formData.category)
        data.append('sizes', JSON.stringify(formData.sizes))
        data.append('tags', JSON.stringify(formData.tags))
        data.append('gender', formData.gender)
        data.append('isFeatured', formData.isFeatured)
        data.append('isPublished', formData.isPublished)

        images.map((img) => {
            if (img.file) {
                data.append('images', img.file)
            }
        })

        try {
            setLoading(true)
            setMessage("")
            const res = await axios.post('http://localhost:5000/api/products/createProduct', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGIyMTI1ZWJiZWZlODhlMmY2YTQ4MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MjMzNzExMSwiZXhwIjoxNzYyOTQxOTExfQ.1MatnLPhZjAJ2lIk6beXct2ixkdpP2bxGzrDVQ_WjmA'
                }
            })
            setMessage("✅ Product created successfully")

        } catch (err) {
            console.log(err);
            setMessage(err.response?.data?.message || "failed to create product")
        } finally {
            setLoading(false)
        }
    }

    // 🚀 Submit form


    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white text-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200">
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

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Basic Info */}
                <div className="col-span-2">
                    <h2 className="mb-2">Upload Images</h2>
                    <div className=" flex  gap-5">
                        {
                            images.map((img, index) => (
                                <div key={index} >
                                    {img.imageUrl ? (
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
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                // required
                />

                <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={formData.sku}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="col-span-2 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                ></textarea>

                {/* Pricing */}
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                // required
                />

                <input
                    type="number"
                    name="discountPrice"
                    placeholder="Discount Price"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />

                {/* Inventory */}
                <input
                    type="number"
                    name="countInStock"
                    placeholder="Stock Count"
                    value={formData.countInStock}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />


                <select
                    className="p-2 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                    name="category"
                    value={formData.category}
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
                    value={formData.sizes}
                    onChange={handleArrayChange}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={handleArrayChange}
                    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />

                {/* Gender */}
                <select
                    name="gender"
                    value={formData.gender}
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
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />
                    <label>Featured Product</label>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
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
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form >
        </div >
    );
};

export default CreateProduct;
