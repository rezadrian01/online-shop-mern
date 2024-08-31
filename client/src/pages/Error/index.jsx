import DefaultLayout from '@/components/Layouts/DefaultLayouts';
import DefaultButton from '@/components/Modules/Buttons/DefaultButton';
import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    let defaultError = true;
    let title = 'Something Went Wrong';
    let message = `Please try again later`;

    if (error.status === 404) {
        title = '404 Not Found';
        message = 'Your visited page not found. You may go home page.'
        defaultError = false;
    }

    return (
        <DefaultLayout>
            <div className='flex flex-col gap-4 md:gap-8 justify-center items-center w-full h-full min-h-[40vh] text-center' >
                <h1 className='text-4xl md:text-6xl lg:text-8xl md:tracking-wider font-semibold'>{title}</h1>
                <p className='font-semibold md:tracking-wide'>{message}</p>
                {error.status === 404 && <DefaultButton onClick={() => navigate('/')} >Back to home page</DefaultButton>}
            </div>
        </DefaultLayout>
    )
}

export default Error