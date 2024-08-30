import SectionLayout from '@/components/Layouts/SectionLayouts'
import { LIST_NEW_ARRIVAL } from '@/constants/listNewArrival'
import React from 'react'


const Content = ({ item, index = 0 }) => {
    return <>
        <img className='' src={item.src} alt={item.alt} />
        <div className='absolute bottom-8 left-8 w-1/2 text-stone-300' style={{ width: index === 2 || index === 3 ? '100%' : null }}>
            <h3 className='text-2xl font-semibold mb-2'>{item.title}</h3>
            <p className='mb-2 text-lg font-thin'>{item.desc}</p>
            <button className='border-b border-b-stone-300 font-bold text-lg'>Shop Now</button>
        </div>
    </>
}

const NewArrival = () => {
    return (
        <SectionLayout btn={false} title="Featured" subtitle="New Arrival">
            <div className='grid grid-cols-4'>
                <div className='relative col-span-2 row-span-2'>
                    <Content item={LIST_NEW_ARRIVAL[0]} />
                </div>
                <div className='relative col-span-2 row-span-1'>
                    <Content item={LIST_NEW_ARRIVAL[1]} />
                </div>
                <div className='relative col-span-1 row-span-1'>
                    <Content item={LIST_NEW_ARRIVAL[2]} index={2} />
                </div>
                <div className='relative col-span-1 row-span-1'>
                    <Content item={LIST_NEW_ARRIVAL[3]} index={3} />
                </div>
            </div>
        </SectionLayout>
    )
}

export default NewArrival