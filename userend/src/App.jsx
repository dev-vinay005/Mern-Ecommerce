import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdminLayout from './components/layout/AdminLayout';
import DashBoardOverView from './admin/DashBoardOverView';
import Users from './admin/Users';
import Products from './admin/Products';
import Orders from './admin/Orders';
import EditProductForm from './components/admin/EditProductForm';
import LoginForm from './components/common/Login';
import Registration from './components/common/Registration';
import SingleProductPage from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import OrdersPage from './pages/OrdersPage';
import OrderConfirmation from './pages/OrderConfirmation';
import PageNotFound from './pages/PageNotFound';
import ProductsPage from './pages/ProductsPage';
import { Toaster } from "react-hot-toast";
import { fetchCart } from './redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
    const userId = useSelector((state) => state.authSlice.user?.userId);
    const dispatch = useDispatch()
    // const userInfo = JSON.parse(localStorage.getItem('userInfo') || "null")
    // const userId = userInfo?.userId || null

    useEffect(() => {
        if (userId) {
            dispatch(fetchCart({ userId }));
        }
    }, [dispatch, userId]);

    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Routes>
                // user routes
                {/* <Route path="/" element={<ProtectedRoute >
                    <UserLayout />
                </ProtectedRoute>}> */}
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path='products' element={<ProductsPage />}></Route>
                    <Route path="loginuser" element={<LoginForm />}></Route>
                    <Route path="registeruser" element={<Registration />}></Route>
                    <Route path="product/:productId" element={<SingleProductPage />}></Route>
                    <Route path="cartpage" element={<CartPage />}></Route>
                    <Route path="cart/checkout" element={<CheckOutPage />}></Route>
                    <Route path="/order-confirmation" element={<OrderConfirmation />}></Route>
                    <Route path="orders" element={<OrdersPage />}></Route>
                </Route>

                // admin routes
                <Route path="/admin/*" element={<AdminLayout />} >
                    <Route index element={<DashBoardOverView />}></Route>
                    <Route path="users" element={<Users />}></Route>
                    <Route path="products" element={<Products />}></Route>
                    <Route path='products/:productId' element={<EditProductForm />}></Route>
                    <Route path='orders' element={<Orders />}></Route>
                </Route>
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App
