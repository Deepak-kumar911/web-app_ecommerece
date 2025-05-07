import { useEffect, useState } from 'react'
import './App.css'
import MainRouter from './mainRoutes/routes'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function App() {
  const auth = useSelector(state=>state?.auth)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    if((location?.pathname?.includes("login") || location?.pathname?.includes("register")) && auth?.token){
      navigate("/")
    }
  },[auth?.token])

  console.log("auth",auth);
  

  return (
    <>
    <MainRouter/>
    </>
  )
}

export default App
