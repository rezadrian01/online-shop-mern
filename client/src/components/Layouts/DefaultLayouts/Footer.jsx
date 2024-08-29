import { LIST_FOOTER_1, LIST_FOOTER_2, LIST_FOOTER_3 } from '@/constants/listFooter';
import EachUtils from '@/utils/EachUtils';
import React from 'react'
import { CiPaperplane } from "react-icons/ci";

const Footer = () => {
    return (
        <div className='bg-stone-950 w-full text-slate-100 p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='flex flex-col gap-4 p-4'>
                    <h3 className='font-bold text-2xl'>Exclusive</h3>
                    <h3 className='text-2xl tracking-wider'>Subscribe</h3>
                    <p className=''>Get 10% off your first order</p>
                    <div className='relative w-full sm:w-1/2 lg:w-full'>
                        <input type='email' name='email' className='bg-inherit outline-none border border-white p-2 rounded placeholder:text-stone-500 w-full' placeholder='Enter your email' />
                        <button className='absolute right-3 top-1/2 -translate-y-1/2'>
                            <CiPaperplane size={20} />
                        </button>
                    </div>
                </div>
                <EachUtils of={LIST_FOOTER_1} render={(item, index) => {
                    return <div key={index} className='flex flex-col gap-4 p-4'>
                        <h3 className='text-2xl font-semibold'>{item.title}</h3>
                        <EachUtils of={item.contents} render={(content, index) => {
                            return <p key={index}>{content}</p>
                        }} />
                    </div>
                }} />
                <EachUtils of={LIST_FOOTER_2} render={(item, index) => {
                    return <div key={index} className='flex flex-col gap-4 p-4'>
                        <h3 className='text-2xl font-semibold'>
                            {item.title}
                        </h3>
                        <EachUtils of={item.contents} render={(content, index) => {
                            return <a key={index} href={content.url}>{content.name}</a>
                        }} />
                    </div>
                }} />
                <EachUtils of={LIST_FOOTER_3} render={(item, index) => {
                    return <div key={index} className='flex flex-col gap-4 p-4'>
                        <h3 className='text-2xl font-semibold'>{item.title}</h3>
                        <EachUtils of={item.contents} render={(content, index) => {
                            return <a key={index} href={content.url}>{content.name}</a>
                        }} />
                    </div>
                }} />

            </div>
        </div>
    )
}

export default Footer