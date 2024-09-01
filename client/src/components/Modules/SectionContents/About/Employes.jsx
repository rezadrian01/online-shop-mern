import React from 'react'

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";

import { LIST_EMPLOYES } from '@/constants/listAbout'
import EachUtils from '@/utils/EachUtils'
import SectionLayout from '@/components/Layouts/SectionLayouts';


const Employes = () => {
    return (
        <SectionLayout lastContent isTitle={false} btn={false} borderBottom={false}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
                <EachUtils of={LIST_EMPLOYES} render={(item, index) => {
                    return <div key={index} className='flex flex-col gap-2 mx-auto'>
                        <img className='w-full object-cover' src={item.img.src} alt={item.img.alt} />
                        <h4 className='mt-4 text-3xl font-semibold'>{item.name}</h4>
                        <p>{item.position}</p>
                        <div className='flex gap-4 mt-2'>
                            <EachUtils of={item.links} render={(item, socialMediaIndex) => {
                                return <SocialMedia index={socialMediaIndex} url={item} />
                            }} />
                        </div>
                    </div>
                }} />
            </div>
        </SectionLayout>
    )
}

const SocialMedia = ({ index, url }) => {
    let logo;
    const size = 20;
    switch (index) {
        case 0:
            logo = <FaXTwitter size={size} />
            break;
        case 1:
            logo = <FaInstagram size={size} />
            break;
        case 2:
            logo = <RiLinkedinLine size={size} />
            break;
    }
    return <a href={url}>
        {logo}
    </a>
}

export default Employes