import { useEffect, useState } from 'react'
import './App.css'
import MainRouter from './mainRoutes/routes'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserCartDetails } from './redux/reducers/cartSlice'

function App() {
  const auth = useSelector(state=>state?.auth)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if((location?.pathname?.includes("login") || location?.pathname?.includes("register")) && auth?.token){
      navigate("/")
    }

    if(auth?._id && auth?.role!="admin")[
      dispatch(getUserCartDetails(auth?._id))
    ]
  },[auth?.token])

  console.log("auth",auth);
  

  return (
    <>
    <MainRouter/>
    </>
  )
}

export default App
