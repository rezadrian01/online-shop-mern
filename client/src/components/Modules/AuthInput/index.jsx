import React, { useState } from 'react'

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const AuthInput = ({ name, id, label }) => {
    const isPassword = name === 'password' || name === 'confirmPassword';
    const [isHide, setIsHide] = useState(isPassword);

    const toggleHidePassword = () => {
        setIsHide(!isHide);
    }

    return (
        <div className='relative text-stone-400'>
            <input className='placeholder-transparent peer outline-none py-2 w-full text-stone-700' placeholder={label} name={name} id={id} type={isHide ? 'password' : 'text'} />
            <label className='absolute pointer-events-none left-0 peer-placeholder-shown:font-normal peer-placeholder-shown:text-lg peer-placeholder-shown:bottom-[.35rem] peer-placeholder-shown:text-inherit peer-focus:font-semibold font-semibold  peer-focus:bottom-7 bottom-7 peer-focus:text-base text-base peer-focus:text-stone-700 text-stone-700  transition-all ' htmlFor={id}>{label}</label>
            <div className='border-b-2 peer-placeholder-shown:border-b-stone-400 peer-focus:border-b-stone-700 border-b-stone-700' />
            {isPassword && <div className='absolute peer-placeholder-shown:hidden block right-2 bottom-2 text-stone-700'>
                {isHide &&
                    <button onClick={toggleHidePassword}>
                        <IoEyeOutline size={22} />
                    </button>
                }
                {!isHide &&
                    <button onClick={toggleHidePassword}>
                        <IoEyeOffOutline size={22} />
                    </button>
                }
            </div>}
        </div>
    )
}

export default AuthInput