import React from 'react'

const DefaultLoading = ({ text }) => {
    return <p className='text-center text-xl animate-pulse'>{text || 'Loading...'}</p>
}

export default DefaultLoading