import React from 'react'

import authImg from '@/assets/auth/a_phone_with_cart.png'
import AuthInput from '@mods/AuthInput'
import DefaultButton from '@mods/Buttons/DefaultButton'
import OutlineButton from '@mods/Buttons/OutlineButton'

import googleLogo from '@/assets/auth/googleLogo.svg';
import { Link } from 'react-router-dom'

const Signin = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries())
        console.log(data)
    }

    const handleGoogleAuth = () => {
        console.log("Google Auth Clicked");
    }

    return (
        <div className='mt-14 mb-24'>
            <div className='grid grid-cols-10'>
                <div className='hidden md:block col-span-6'>
                    <img className='' src={authImg} />
                </div>
                <div className='col-span-10 md:col-span-4 flex justify-center items-center '>
                    <div className='flex flex-col gap-4 w-5/6 md:w-4/6 mx-auto '>
                        <h1 className='text-3xl tracking-wider font-semibold'>Log in to Exclusive</h1>
                        <p className='mb-6'>Enter your details bellow</p>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-12'>
                                    <AuthInput name='email' id='email' label='Email' />
                                    <AuthInput name='password' id='password' label='Password' />
                                </div>
                                <Link to='' className='mb-8 mt-2 text-red-500 hover:underline'>Forget Password?</Link>
                                <div className='flex flex-col gap-4'>
                                    <DefaultButton type="submit" >Login</DefaultButton>
                                    <OutlineButton type="button" onClick={handleGoogleAuth}>
                                        <img src={googleLogo} className='w-6' />
                                        <span>Sign in with Google</span>
                                    </OutlineButton>
                                </div>
                                <div className='text-center'>
                                    <p>Dont have account yet? <Link className='underline' to="/signup">Create Account</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin