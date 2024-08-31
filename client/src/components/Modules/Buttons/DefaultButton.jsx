import React from 'react'

const DefaultButton = ({ width, children, ...props }) => {
    return (
        <button {...props} className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded' style={{ width: width || null }}>{children}</button>
    )
}

export default DefaultButton