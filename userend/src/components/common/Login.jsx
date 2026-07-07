
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { MdOutlineLogin } from "react-icons/md";
import { loginUser, resetAuthState } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { user, error, loading } = useSelector((state) => {
        return state.authSlice
    });

    useEffect(() => {
        if (user) {
            toast.success("Login successful!")
            navigate("/")
            setFormData({
                email: "",
                password: "",
            })
            dispatch(resetAuthState())
        }
        if (error) {
            toast.error(error)
            dispatch(resetAuthState())
            return
        }

        console.log(user, error);

    }, [user, error])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(formData))
    }

    return (
        <div className="min-h-screen bg-white flex">
            <div className="flex-1 bg-[#262D3F] hidden md:flex  items-center justify-center h-screen ">
                <div className="max-w-[400px] text-center flex flex-col items-center justify-center ">
                    <div className="w-16 h-16 text-white bg-[#4A505F] rounded-full mb-6   flex items-center justify-center">
                        <h3 className="text-2xl font-bold">E</h3>
                    </div>
                    <h2 className="text-5xl font-bold mb-4 text-white">Welcome Back!</h2>
                    <p className="text-xl text-gray-200 ">
                        Sign in to your account and continue your shopping journey with
                        EliteStore
                    </p>
                </div>
            </div>
            <div className=" flex flex-col  justify-center flex-1">
                <Link to="/">
                    <button className="px-7 py-3 mb-8 ml-5 text-gray-700 font-medium rounded-md text-sm flex items-center gap-2 hover:text-black transotion-all duration-200 group">
                        <FaArrowLeft className="text-xs ront-regular text-gray-800  group-hover:-translate-x-1 transotion-all duration-200" />
                        Back to home
                    </button>
                </Link>
                <div className="w-full max-w-md mx-auto  rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in">
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 mx-auto bg-[#0F172A] text-white flex items-center justify-center rounded-full mb-3 animate-spin-slow">
                            <MdOutlineLogin className="text-2xl" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800">Sign In</h1>
                        <p className="text-gray-400 text-sm mt-4">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {[
                            {
                                name: "email",
                                placeholder: "Email Address",
                                icon: (
                                    <MdOutlineMailOutline className="mr-3 text-xl text-gray-600" />
                                ),
                                type: "email",
                            },
                            {
                                name: "password",
                                placeholder: "Password",
                                icon: <GoLock className="mr-3 text-xl text-gray-600" />,
                                type: "password",
                            },
                        ].map(({ name, placeholder, icon, type }) => {
                            return (
                                <div key={name}>
                                    <label className=" mb-2 block text-sm font-medium text-gray-700">
                                        {name}
                                    </label>
                                    <div className="relative flex items-center bg-white rounded-lg px-3 py-3 border border-gray-200 focus-within:ring-1 focus-within:ring-[#0F172A] transition-all duration-300">
                                        {icon}
                                        <input
                                            name={name}
                                            type={type}
                                            placeholder={placeholder}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-400 text-md"
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0F172A] text-white py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-4 w-4 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                                        ></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                        <div
                            className="text-center text-sm text-gray-600 mt-4 animate-slide-in"
                            style={{ animationDelay: "200ms" }}
                        >
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/registeruser"
                                className="text-[#0F172A] font-medium hover:text-emerald-600 hover:underline transition-colors"
                            >
                                Register
                            </Link>
                        </div>

                        <div
                            className="text-center mt-4 animate-slide-in"
                            style={{ animationDelay: "300ms" }}
                        >

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
