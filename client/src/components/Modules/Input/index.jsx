import React from 'react'

import { IoMdCheckmark } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";

const DefaultInput = ({ label, id, placeholder = '', name, textarea = false, required = true, width = '100%', labelSemibold = null, labelColor = null, ...props }) => {
    return (
        <div className='flex flex-col gap-2' style={{ width: width }}>
            <label className='text-stone-400 text-lg' htmlFor={id} style={{ color: labelColor || null, fontWeight: labelSemibold && '600' }} >{label}{required && label && <span className='text-red-300' >*</span>}</label>

            {!textarea && <input className='outline-none bg-stone-100 rounded py-2 px-4 text-stone-500 text-lg ' id={id} name={name} placeholder={placeholder} required={required} {...props} />}

            {textarea && <textarea className='outline-none bg-stone-100 rounded py-2 px-4 text-stone-500 text-lg h-full min-h-[10rem]' id={id} name={name} placeholder={placeholder} required={required} {...props} />}
        </div>
    )
}

export const Checkbox = ({ label, id, name, value }) => {
    return (
        <div className='relative flex items-center gap-2'>
            <input
                className='peer bg-white border border-gray-700 checked:bg-red-500 checked:border-red-500 focus:outline-none w-4 h-4 appearance-none transition-all '
                id={id}
                type='checkbox'
                name={name}
                value={value}
            />
            <div className='absolute pointer-events-none'>
                <IoMdCheckmark color='white' />
            </div>
            <label className='cursor-pointer' htmlFor={id}>{label}</label>
        </div>
    )
}

export const Radio = ({ label, id, name, value }) => {
    return <div className='relative flex gap-2 items-center'>
        <input className='appearance-none peer bg-white border border-gray-700 rounded-full w-4 h-4  focus:outline-none ' name={name} id={id} type='radio' value={value} />
        <div className='hidden absolute peer-checked:block'>
            <FaDotCircle color='rgb(239 68 68)' />
        </div>
        <label htmlFor={id}>{label}</label>
    </div>
}


export default DefaultInput
