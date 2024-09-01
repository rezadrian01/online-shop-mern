import React from 'react'

import { CiShop } from "react-icons/ci";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { TbMoneybag } from "react-icons/tb";
import EachUtils from '@/utils/EachUtils';
import { LIST_STATS } from '@/constants/listAbout';
import SectionLayout from '@/components/Layouts/SectionLayouts';


const StatsSection = () => {
    return (
        <SectionLayout lastContent isTitle={false} btn={false} borderBottom={false}>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 w-full'>
                <EachUtils of={LIST_STATS} render={(item, index) => {
                    return <div key={index} className='flex flex-col items-center justify-center  p-10 border-stone-200 border-2 rounded gap-5 transition-all duration-150 text-center'>
                        <StatsLogo index={index} />
                        <h3 className='text-3xl font-bold'>{item.amount}</h3>
                        <p>{item.desc}</p>
                    </div>
                }} />
            </div>
        </SectionLayout>
    )
}

const StatsLogo = ({ index }) => {
    let logo;
    const logoSize = 50;
    switch (index) {
        case 0:
            logo = <CiShop size={logoSize} />
            break;
        case 1:
            logo = <AiOutlineDollarCircle size={logoSize} />
            break;
        case 2:
            logo = <FiShoppingBag size={logoSize} />
            break;
        case 3:
            logo = <TbMoneybag size={logoSize} />
            break;
    }
    return <>
        {logo}
    </>
}

export default StatsSection