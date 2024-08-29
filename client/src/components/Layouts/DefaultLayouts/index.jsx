import React from 'react'
import Navbar from './Navbar'

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}

export default DefaultLayout