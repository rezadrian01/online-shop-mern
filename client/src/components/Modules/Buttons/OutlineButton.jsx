import React from 'react'

const OutlineButton = ({ borderWidth = 1, children, ...props }) => {
    return (
        <button {...props} className='text-stone-800 border-stone-600 px-6 py-3 rounded flex gap-2 justify-center items-center relative' style={{ borderWidth }}>{children}</button>
    )
}

export default OutlineButton