import React from 'react'
import Navbar from './Navbar'

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='w-full px-2 md:px-10 lg:px-24'>{children}</div>
        </>
    )
}

export default DefaultLayout