import React from 'react'

const DefaultButton = ({ type = 'button', textOnly = false, width, children, ...props }) => {
    return (
        <button type={type} {...props} className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded' style={{ width: width || null, backgroundColor: textOnly && 'transparent', color: textOnly && 'inherit' }}>{children}</button>
    )
}

export default DefaultButton