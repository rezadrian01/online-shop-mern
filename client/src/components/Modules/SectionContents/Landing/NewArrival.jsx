import SectionLayout from '@/components/Layouts/SectionLayouts'
import { LIST_NEW_ARRIVAL } from '@/constants/listNewArrival'
import React from 'react'
import { GoArrowRight } from "react-icons/go";


const Content = ({ item, index = 0 }) => {
    return <div className='w-full rounded overflow-hidden md:flex' >
        <div className=''>
            <img className='w-full object-cover' src={item.src} alt={item.alt} style={{ height: '100%' }} />
        </div>
        <div className='absolute left-8 bottom-8 text-stone-300 pr-4' style={{ width: index === 1 ? '100%' : null }}>
            <h3 className='text-xl lg:text-2xl font-semibold mb-1 lg:mb-2'>{item.title}</h3>
            <p className=' text-base lg:text-lg font-thin mb-1 lg:mb-2'>{item.desc}</p>
            <button className='border-b border-b-stone-400 font-bold text-base lg:text-lg flex items-center gap-1 pr-1 hover:gap-2 hover:pr-0 transition-all'>Shop Now
                <span>
                    <GoArrowRight />
                </span>
            </button>
        </div>
    </div>
}

const NewArrival = () => {
    return (
        <SectionLayout btn={false} title="Featured" subtitle="New Arrival" borderBottom={false}>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px] mx-auto'>
                <div className='relative col-span-2 md:row-span-2 flex'>
                    <Content item={LIST_NEW_ARRIVAL[0]} />
                </div>
                <div className='relative col-span-2 flex'>
                    <Content item={LIST_NEW_ARRIVAL[1]} />
                </div>
                <div className='relative col-span-2 md:col-span-1 flex'>
                    <Content item={LIST_NEW_ARRIVAL[2]} index={2} />
                </div>
                <div className='relative col-span-2 md:col-span-1 flex'>
                    <Content item={LIST_NEW_ARRIVAL[3]} index={3} />
                </div>
            </div>
        </SectionLayout>
    )
}

export default NewArrival