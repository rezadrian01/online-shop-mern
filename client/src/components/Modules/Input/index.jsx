import React from 'react'

const DefaultInput = ({ label, id, placeholder = '', name, textarea = false, required = true, width = '100%', ...props }) => {
    return (
        <div className='flex flex-col gap-2' style={{ width: width }}>
            <label className='text-stone-400 text-lg' htmlFor={id}>{label}{required && <span className='text-red-300'>*</span>}</label>
            <input className='outline-none bg-stone-100 rounded py-2 px-4 text-stone-500 text-lg ' id={id} name={name} placeholder={placeholder} required={required} {...props} />
        </div>
    )
}

export const Checkbox = ({ label, id, name }) => {
    return (
        <div className='flex items-center gap-2'>
            <input
                className='h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none transition duration-200 cursor-pointer'
                id={id}
                type='checkbox'
                name={name}
            />
            <label className='cursor-pointer' htmlFor={id}>{label}</label>
        </div>
    )
}

export const Radio = ({ label, id, name }) => {
    return <div className='flex gap-2 items-center'>
        <input name={name} id={id} type='radio' />
        <label htmlFor={id}>{label}</label>
    </div>
}


export default DefaultInput
