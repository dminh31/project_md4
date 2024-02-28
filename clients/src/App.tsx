import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AdminUser from './pages/Admin/AdminUser'
import AdminProduct from './pages/Admin/AdminProduct'
import AdminBill from './pages/Admin/AdminBill'
import AdminCate from './pages/Admin/AdminCate'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PrivateRouter from './pages/PrivateRouter/PrivateRouter'
import Products from './pages/Product/Products'
import Cart from './pages/Cart/Cart'
import Bill from './pages/Bill/Bill'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Introduction from './pages/Introduction/Introduction'
import './App.css'
export default function App() {
  return (
    <body>
      <Routes>
        <Route path='/' element={<><Header /> <Outlet /> <Footer /></>}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product' element={<Products />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/productDetails/:id' element={<ProductDetail />}></Route>
          <Route path='/bill' element={<Bill />}></Route>
          <Route path='/introduction' element={<Introduction />}></Route>
        </Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>


        <Route path='/adminProduct' element={<PrivateRouter />}>
          <Route path='/adminProduct' element={<AdminProduct></AdminProduct>}></Route>
        </Route>

        <Route path='/adminUser' element={<PrivateRouter />}>
          <Route path='/adminUser' element={<AdminUser></AdminUser>}></Route>
        </Route>

        <Route path='/adminBill' element={<PrivateRouter />}>
          <Route path='/adminBill' element={<AdminBill></AdminBill>}></Route>
        </Route>

        <Route path='/adminCate' element={<PrivateRouter />}>
          <Route path='/adminCate' element={<AdminCate></AdminCate>}></Route>
        </Route>
      </Routes>
    </body>
  )
}
