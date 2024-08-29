import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='w-full px-2 md:px-10 lg:px-24 min-h-screen'>{children}</div>
            <Footer />
        </>
    )
}

export default DefaultLayout