import React from 'react'

import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";

import { CALL_CONTACT, MESSAGE_CONTACT } from '@/constants/listContacts';
import EachUtils from '@/utils/EachUtils';
import DefaultInput from '@/components/Modules/Input';
import DefaultButton from '@/components/Modules/Buttons/DefaultButton';

const Contact = () => {
    const sizeLogo = 23;

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='pb-20'>
                <div className='grid grid-cols-6 gap-x-12 gap-y-24'>
                    <div className='col-span-6 lg:col-span-2 shadow-md rounded-lg p-4 flex flex-col md:flex-row lg:flex-col gap-6 border'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-4 mb-2 items-center'>
                                <div className='bg-red-500 rounded-full p-4'>
                                    <LuPhone color='white' size={sizeLogo} />
                                </div>
                                <h3 className='text-xl font-semibold'>{CALL_CONTACT[0].title}</h3>
                            </div>
                            <EachUtils of={CALL_CONTACT[0].contents} render={(item, index) => {
                                return <p>{item}</p>
                            }} />
                        </div>

                        <div className='hidden lg:block w-full border border-stone-600 my-4' />
                        <div className='block lg:hidden h-5/6 border border-stone-600 my-4' />

                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-4 mb-2 items-center'>
                                <div className='bg-red-500 rounded-full p-4'>
                                    <CiMail color='white' size={sizeLogo} />
                                </div>
                                <h3 className='text-xl font-semibold'>{MESSAGE_CONTACT[0].title}</h3>
                            </div>
                            <EachUtils of={MESSAGE_CONTACT[0].contents} render={(item, index) => {
                                return <p>{item}</p>
                            }} />
                        </div>
                        <div></div>
                    </div>
                    <div className='col-span-6 lg:col-span-4 shadow-md p-4 rounded-lg h-full border'>
                        <div className='grid md:grid-cols-3 gap-y-2 gap-x-4 mb-4'>
                            <DefaultInput id='name' name='name' placeholder='Your Name' />
                            <DefaultInput id='email' name='email' placeholder='Your Email' />
                            <DefaultInput id='phone' name='phone' placeholder='Your Phone' />
                        </div>
                        <div className='col-span-3 row-span-7 mb-10'>
                            <DefaultInput id='message' name='message' placeholder='Write Your Message Here' textarea />
                        </div>
                        <div className='flex justify-end'>
                            <DefaultButton type='submit'>Send Message</DefaultButton>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Contact