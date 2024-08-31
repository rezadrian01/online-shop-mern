import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'

const DefaultLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/signup' || location.pathname === '/signin'
    const paddingX = isAuthPage ? 0 : null;
    const minHeight = isAuthPage ? '60vh' : '100vh'
    return (
        <>
            <Navbar />
            <div className='w-full px-2 md:px-10 lg:px-14 xl:px-24' style={{ paddingLeft: paddingX, paddingRight: paddingX, minHeight }}><Outlet /></div>
            <Footer />
        </>
    )
}

export default DefaultLayout