import React from 'react'

const DefaultButton = ({ children, ...props }) => {
    return (
        <button {...props} className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded'>{children}</button>
    )
}

export default DefaultButton