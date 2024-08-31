import React from 'react'

import { TbTruckDelivery } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { GoShieldCheck } from "react-icons/go";
import SectionLayout from '@/components/Layouts/SectionLayouts';

const FeatureSection = () => {
    return (
        <SectionLayout lastContent isTitle={false} btn={false} borderBottom={false}>
            <div className='flex justify-center gap-10 md:gap-16 flex-col lg:flex-row lg:gap-36 text-center'>
                <div className='flex flex-col gap-1 justify-center items-center'>
                    <div className='bg-gray-300 rounded-full w-[80px] h-[80px] flex justify-center items-center mx-auto mb-4' >
                        <div className='bg-stone-950 rounded-full p-2 ' >
                            <TbTruckDelivery color='white' size={40} />
                        </div>
                    </div>
                    <h2 className='uppercase font-semibold text-lg lg:text-xl'>FREE AND FAST DELIVERY</h2>
                    <p>Free delivery for all orders over $140</p>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center'>
                    <div className='bg-gray-300 rounded-full w-[80px] h-[80px] flex justify-center items-center mx-auto mb-4' >
                        <div className='bg-stone-950 rounded-full p-2 ' >
                            <BsHeadset color='white' size={40} />
                        </div>
                    </div>
                    <h2 className='uppercase font-semibold text-lg lg:text-xl'>24/7 CUSTOMER SERVICE</h2>
                    <p>Friendly 24/7 customer support</p>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center'>
                    <div className='bg-gray-300 rounded-full w-[80px] h-[80px] flex justify-center items-center mx-auto mb-4' >
                        <div className='bg-stone-950 rounded-full p-2 ' >
                            <GoShieldCheck color='white' size={40} />
                        </div>
                    </div>
                    <h2 className='uppercase font-semibold text-lg lg:text-xl'>MONEY BACK GUARANTEE</h2>
                    <p>We return money within 30 days</p>
                </div>
            </div>
        </SectionLayout>
    )
}

export default FeatureSection