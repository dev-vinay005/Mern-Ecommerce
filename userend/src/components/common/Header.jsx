"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cartSlice.cart.products)
  const user = useSelector((state) => state.authSlice.user);


  // const [fetchCategories, setFetchCategories] = useState([]);
  // const { cart } = useContext(CartContext);

  // useEffect(() => {
  //   const fetchCategoriesData = async () => {
  //     try {
  //       const res = await fetch("http://localhost:4000/getmainCategory");
  //       const data = await res.json();
  //       setFetchCategories(data);
  //     } catch (err) {
  //       console.error("Failed to fetch categories:", err);
  //     }
  //   };
  //   fetchCategoriesData();
  // }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    toast.success("Logged out successfully");
    navigate("/loginuser");
  }

  return (
    <header className=" sticky top-0 z-50 backdrop-blur-sm bg-white/60 border-b-2 border-gray-200 shadow-sm">
      <div className="bg-[#0F172A] text-white text-center py-2 px-4">
        <p className="text-s">
          Free shipping on orders over $50 | 30-day return policy
        </p>
      </div>

      <div className="relative max-w-[1400px] m-auto px-4 py-4  flex flex-wrap md:flex-nowrap items-center justify-between">
        <div className="text-2xl font-extrabold text-gray-900">
          <Link to="/">
            <div className="flex items-center space-x-3 ">
              <div className="h-8 w-9 bg-[#0F172A] text-white flex items-center justify-center rounded-lg font-bold text-xl">
                E
              </div>
              <span className="text-2xl font-bold text-black">EliteStore</span>
            </div>
          </Link>
        </div>
        {/* for desktop */}
        <nav className="hidden lg:flex flex-wrap justify-center items-center md:justify-start space-x-6 text-gray-700 mt-4 md:mt-0">
          <Link
            to="/"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            Home
          </Link>
          <div className="relative group ">
            <Link
              to="/products?category=allproducts&limit=6&page=1"
              className="hover:text-blue-600 transition duration-200 font-medium"
            >
              Products
            </Link>

            {/* =======DropDown===== */}
            {/* <div className="absolute top-[100%] w-[220px]  left-1/2 -translate-x-1/2 hidden group-hover:flex  flex-col bg-[#172442] text-white shadow-lg rounded-lg py-3">
              {fetchCategories.map((category) => (
                <Link
                  key={category.id}
                  to="productcategories"
                  className="py-2  transition duration-200 hover:bg-white hover:text-[#172442] px-4"
                >
                  {category.title}
                </Link>
              ))}
            </div> */}
          </div>

          <Link
            to="/about"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            About
          </Link>
          <Link
            to="/contactus"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            Contact Us
          </Link>
          <Link
            to="/orders"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            My Orders
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-[#0F172A] hover:bg-[#0D1524] text-white cursor-pointer transition duration-200 font-medium py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          )}
        </nav>

        {/* for mobile */}

        {isOpen && <nav className=" flex flex-col gap-4 items-start bg-white absolute  w-full top-[100%] py-5 px-2 left-0 flex-wrap lg:hidden justify-center md:justify-start space-x-6 text-gray-700 border-t border-gray-300 md:mt-0">
          <Link
            to="/"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            Home
          </Link>
          <div className="relative group ">
            <Link
              to="/products"
              className="hover:text-blue-600 transition duration-200 font-medium"
            >
              Products
            </Link>

            {/* =======DropDown===== */}
            {/* <div className="absolute top-[100%] w-[220px]  left-1/2 -translate-x-1/2 hidden group-hover:flex  flex-col bg-[#172442] text-white shadow-lg rounded-lg py-3">
              {fetchCategories.map((category) => (
                <Link
                  key={category.id}
                  to="productcategories"
                  className="py-2  transition duration-200 hover:bg-white hover:text-[#172442] px-4"
                >
                  {category.title}
                </Link>
              ))}
            </div> */}
          </div>

          <Link
            to="/about"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            About
          </Link>
          <Link
            to="/contactus"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            Contact Us
          </Link>
          <Link
            to="/orders"
            className="hover:text-blue-600 transition duration-200 font-medium"
          >
            My Orders
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-[#0F172A] hover:bg-[#0D1524] text-white cursor-pointer transition duration-200 font-medium py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          )}
        </nav>}

        <div className="flex  items-center  mt-4 md:mt-0">
          <Link to="/loginuser">
            <div className="relative  flex items-center justify-center w-11 h-11 rounded-lg mr-0 group text-gray-700 hover:text-blue-600 hover:bg-white transition duration-200  ">
              <FiUser size={17} />
            </div>
          </Link>

          <Link to="/cartpage">
            <div className="relative  flex items-center justify-center w-11 h-11 rounded-lg mr-0 group text-gray-700 hover:text-blue-600 hover:bg-white transition duration-200  ">
              <FiShoppingCart size={17} />

              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full">
                {cartCount.length}
              </span>
            </div>
          </Link>
        </div>

        <div className="block lg:hidden p-2 flex-shrink-0" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu size={20} />
        </div>
      </div >
    </header >
  );
};

export default Header;
