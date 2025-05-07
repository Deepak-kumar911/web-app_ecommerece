import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/reducers/authSlice'

export default function Header() {
    const auth = useSelector(state=>state?.auth)
    const cart = useSelector(state=>state?.cart)
    const dispatch = useDispatch()

    const handleLogout = ()=>{
      dispatch(logout())
    }
  return (
    <div>
         <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to={"/"} className="text-2xl font-bold text-blue-600">ShopifyX</Link>
          <nav className="space-x-6">
            <Link to={"/"} className="text-gray-700 hover:text-blue-500">Home</Link>
             {auth?.role=="admin" && <Link to={"/admin/all-product"} className="text-gray-700 hover:text-blue-500">Admin</Link>}
             {auth?.role=="user" && <Link to={"/user/cart"} className="text-gray-700 hover:text-blue-500">Cart <span className='bg-red-600 p-1 text-white rounded-md'>{cart?.items?.length}</span></Link>}
             {auth?.token ? <span onClick={handleLogout} className='text-gray-700 cursor-pointer hover:text-blue-500'>Logout</span> :<Link to={"/user/login"} className="text-gray-700 hover:text-blue-500">Login</Link> }
            
          </nav>
        </div>
      </header>
    </div>
  )
}
