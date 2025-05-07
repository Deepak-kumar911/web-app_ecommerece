import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

export default function UserLayout({children}) {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}
