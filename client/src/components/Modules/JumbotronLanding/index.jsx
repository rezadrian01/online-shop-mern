import { LIST_JUMBOTRON_CATEGORIES } from '@/constants/listJumbotronCategories'
import EachUtils from '@/utils/EachUtils'
import React from 'react'
import { LIST_JUMBOTRON_IMAGES_250_80, LIST_JUMBOTRON_IMAGES_500_150, LIST_JUMBOTRON_IMAGES_1200_400 } from '@/constants/listJumbotronImages'
import Carousel from './Carousel'

const JumbotronLanding = () => {
    return (
        <div>
            <div className='grid grid-cols-6'>
                <div className='col-span-2 lg:col-span-1 border-r-2 border-r-stone-200 flex flex-col gap-3 pt-4'>
                    <EachUtils of={LIST_JUMBOTRON_CATEGORIES} render={(item, index) => {
                        return <a key={index} className='font-semibold' href={item.url}>{item.title}</a>
                    }} />
                </div>
                <div className='col-span-4 lg:col-span-5 py-4 px-2 '>
                    <Carousel images={LIST_JUMBOTRON_IMAGES_1200_400} />
                </div>
                {/* <div className='hidden md:block lg:hidden col-span-4 py-4 px-2'>
                    <Carousel images={LIST_JUMBOTRON_IMAGES_500_150} width={500} />
                </div>
                <div className='block md:hidden col-span-4 py-4 px-2'>
                    <Carousel images={LIST_JUMBOTRON_IMAGES_250_80} width={250} />
                </div> */}
            </div>
        </div>
    )
}

export default JumbotronLanding