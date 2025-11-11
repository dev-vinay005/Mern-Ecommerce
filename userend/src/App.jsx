import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import DashBoardOverView from './admin/DashBoardOverView';
import Users from './admin/Users';
import Products from './admin/Products';
import Orders from './admin/Orders';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/*" element={<AdminLayout />} >
                    <Route index element={<DashBoardOverView />}></Route>
                    <Route path="users" element={<Users />}></Route>
                    <Route path="products" element={<Products />}></Route>
                    <Route path='orders' element={<Orders />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
