import SectionLayout from '@/components/Layouts/SectionLayouts'
import { LIST_NEW_ARRIVAL } from '@/constants/listNewArrival'
import React from 'react'
import { GoArrowRight } from "react-icons/go";


const Content = ({ item, index = 0 }) => {
    return <>
        <div className='rounded overflow-hidden'>
            <img className='w-full' src={item.src} alt={item.alt} />
        </div>
        <div className='absolute left-8 w-1/2 text-stone-300' style={{ width: index === 2 || index === 3 ? '100%' : null }}>

        </div>
    </>
}

const NewArrival = () => {
    return (
        <SectionLayout btn={false} title="Featured" subtitle="New Arrival" borderBottom={false}>
            <div className='grid grid-cols-4 gap-4 max-w-[1200px] max-h-[600px] overflow-hidden mx-auto'>
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