 import React from 'react'
 import { Routes,Route } from 'react-router-dom'

 import HomePage from '../pages/homePage'
import UserLayout from '../Layout/userLayout'
import AdminLogin from '../pages/admin/Login'
import AdminRegisterPage from '../pages/admin/register'
import AdminAllProduct from '../pages/admin/allProduct'
import CreateOrUpdateProduct from '../pages/admin/createOrUpdateProduct'
import ProductDetailPage from '../pages/products/ProductDetails'
import UserRegisterPage from '../pages/user/UserRegisterPage'
import UserLoginPage from '../pages/user/UserLoginPage'
 
 export default function MainRouter() {
   return (
     <Routes>
        <Route path='/' element={<UserLayout><HomePage/></UserLayout>}/>
        <Route path='/admin/login' element={<UserLayout><AdminLogin/></UserLayout>}/>
        <Route path='/admin/register' element={<UserLayout><AdminRegisterPage/></UserLayout>}/>
        <Route path='/admin/all-product' element={<UserLayout><AdminAllProduct/></UserLayout>}/>
        <Route path='/admin/add-product' element={<UserLayout><CreateOrUpdateProduct/></UserLayout>}/>
        <Route path='/admin/edit-product/:id' element={<UserLayout><CreateOrUpdateProduct/></UserLayout>}/>

        {/* user routes */}
        <Route path='/product/:id' element={<UserLayout><ProductDetailPage/></UserLayout>}/>
        <Route path='/user/login' element={<UserLayout><UserLoginPage/></UserLayout>}/>
        <Route path='/user/register' element={<UserLayout><UserRegisterPage/></UserLayout>}/>
     </Routes>
   )
 }
 