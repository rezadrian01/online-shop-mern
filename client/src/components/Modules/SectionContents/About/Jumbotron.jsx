import { CAPTION_JUMBOTRON_ABOUT, LIST_JUMBOTRON_ABOUT_IMAGES } from '@/constants/listAbout'
import EachUtils from '@/utils/EachUtils'
import React from 'react'

const JumbotronAbout = () => {
    return (
        <div className='grid grid-cols-6 items-center justify-center px-2 md:px-32 lg:px-0 mb-40'>
            <div className='hidden lg:block lg:col-span-3 pr-16'>
                <EachUtils of={CAPTION_JUMBOTRON_ABOUT} render={(item, index) => {
                    return <div className='flex flex-col gap-6' key={index}>
                        <h3 className='text-5xl font-semibold mb-2'>{item.title}</h3>
                        <EachUtils of={item.desc} render={(desc, index) => {
                            return <p className='text-[1.1rem]' key={index}>{desc}</p>
                        }} />
                    </div>
                }} />
            </div>
            <div className='col-span-6 lg:col-span-3'>
                <img className='w-full aspect-square' src={LIST_JUMBOTRON_ABOUT_IMAGES[0].src} alt={LIST_JUMBOTRON_ABOUT_IMAGES[0].alt} />
            </div>
            <div className='block col-span-6 lg:hidden'>
                <EachUtils of={CAPTION_JUMBOTRON_ABOUT} render={(item, index) => {
                    return <div className='flex flex-col gap-6 mt-20' key={index}>
                        <h3 className='text-5xl font-semibold mb-2'>{item.title}</h3>
                        <EachUtils of={item.desc} render={(desc, index) => {
                            return <p className='text-[1.1rem]' key={index}>{desc}</p>
                        }} />
                    </div>
                }} />
            </div>
        </div>
    )
}

export default JumbotronAbout