import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { SlScreenSmartphone } from "react-icons/sl";
import { LuShirt } from "react-icons/lu";
import { RiArmchairLine } from "react-icons/ri";
import { TbStethoscope } from "react-icons/tb";

const CategorySection = () => {
    // const [loading, setLoading] = useState(true);
    // const [categories, setCategories] = useState([]);

    const categoriesData = [
        {
            title: "Electronic",
            image: "/images/electronic.jpg",
            icon: <SlScreenSmartphone className="text-white" />,
            content: "Latest gadgets and cutting-edge technology",
            quentity: "10",
            tag: "Hot 🔥",
        },
        {
            title: "Medical",
            image: "/images/medical.jpg",
            icon: <TbStethoscope className="text-white" />,
            content: "Professional health & medical supplies",
            quentity: "10",
            tag: "Professional 🗂️",
        },
        {
            title: "Clothing",
            image: "/images/clothing.jpg",
            icon: <LuShirt className="text-white" />,
            content: "Fashion trends for every style",
            quentity: "10",
            tag: "Trending 🛍️",
        },
        {
            title: "Furniture",
            image: "/images/furneture.jpg",
            icon: <RiArmchairLine className="text-white" />,
            content: "Transform your living space",
            quentity: "10",
            tag: "New 📈",
        },
    ];

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const res = await fetch("http://localhost:4000/getmainCategory");
    //             const data = await res.json();
    //             const merged = data.map((apiCat) => {
    //                 const match = categoriesData.find(
    //                     (staticCat) => staticCat.title === apiCat.title
    //                 );
    //                 return { ...apiCat, ...match };
    //             });
    //             setCategories(merged);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchCategories();
    // }, []);

    const layoutMap = [
        "col-span-1 row-span-1  md:col-span-2 md:col-row-1 lg:row-span-2",
        "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
        "col-span-1 row-span-1 md:col-span-2 lg:col-span-1 md:row-span-1",
        "col-span-1 row-span-1 md:col-span-2 lg:col-span-1 md:row-span-1",
    ];

    return (
        <section className="bg-[#FAFBFB] py-17">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center gap-5">
                    <div className="flex items-center gap-2 bg-[#E7E7E9] px-5 py-2 rounded-3xl">
                        <h3 className="text-sm font-medium">🛍️ Shop By Category</h3>
                    </div>
                    <h2 className="text-5xl font-bold text-gray-800">
                        Explore our Category
                    </h2>
                    <p className="text-lg text-gray-500">
                        Discover premium products across all categories, curated for quality
                        and style
                    </p>
                </div>

                <div className="w-full my-10">
                    {/* {loading ? (
                        <div className="grid md:grid-cols-4 auto-rows-[250px] gap-4">
                            {Array(4)
                                .fill(null)
                                .map((_, index) => (
                                    <div
                                        key={index}
                                        className={`${layoutMap[index]} rounded-2xl overflow-hidden`}
                                    >
                                        <Skeleton
                                            style={{ height: "100%", width: "100%" }}
                                            borderRadius={12}
                                            baseColor="#e0e0e0"
                                            highlightColor="#f5f5f5"
                                        />
                                    </div>
                                ))}
                        </div>
                    ) : ( */}
                    <div className="grid md:grid-cols-4 auto-rows-[250px] gap-4">
                        {categoriesData.map((category, index) => (
                            <div
                                key={category.id}
                                className={`${layoutMap[index]} rounded-2xl overflow-hidden group relative`}
                            >
                                {/* Background image with zoom on hover */}
                                <div
                                    className="absolute inset-0 bg-center bg-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                    style={{ backgroundImage: `url(${category.image})` }}
                                />
                                {/* Overlay content */}
                                <div className="relative z-10 w-full h-full flex items-center justify-center flex-col bg-gradient-to-t from-black/60 via-black/30 to-black/20 p-6">
                                    <span className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm py-1 px-4 rounded-full text-xs text-white font-medium">
                                        {category.tag}
                                    </span>
                                    <div className="absolute bottom-7 left-7">
                                        <div className="flex items-center">
                                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-2xl mr-3">
                                                {category.icon}
                                            </div>
                                            <div className="flex flex-col gap-1 items-start">
                                                <h2 className="text-white text-2xl font-bold">
                                                    {category.title}
                                                </h2>
                                                <p className="py-1 px-5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                                                    {category.quentity}+ items
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-md text-white my-3">
                                            {category.content}
                                        </p>

                                        <Link to="/products">
                                            <button
                                                className="text-white rounded-md text-md font-medium transition-all duration-200 group"
                                                onClick={() => {
                                                    console.log(category.title);
                                                }}
                                            >
                                                Shop Now
                                                <FaLongArrowAltRight className="inline-block ml-2 text-sm group-hover:translate-x-1 transition-all duration-200" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* )} */}
                </div>

                <p className="flex items-center justify-center group text-gray-500">
                    <span className="mr-2">Can't find what you’re looking for?</span>
                    <Link
                        to="#"
                        className="text-black font-medium group-hover:underline transition-all duration-200"
                    >
                        Browse all Products{" "}
                        <FaLongArrowAltRight className="inline-block text-sm group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default CategorySection;
