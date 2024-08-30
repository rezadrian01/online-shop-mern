import SectionLayout from '@/components/Layouts/SectionLayouts'
import React, { useState } from 'react'
import { CiMobile3, CiHeadphones } from "react-icons/ci";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoWatchOutline, IoCameraOutline } from "react-icons/io5";
import { PiGameControllerThin } from "react-icons/pi";


const OutlineCategory = ({ selectedCategoryIndex, index }) => {
    let content;
    let caption;
    switch (index) {
        case 0:
            content = <CiMobile3 size={50} color={index === selectedCategoryIndex ? 'white' : null} />
            caption = 'Phones'
            break;
        case 1:
            content = <HiOutlineComputerDesktop size={50} color={index === selectedCategoryIndex ? 'white' : null} />
            caption = 'Computers'
            break;
        case 2:
            content = <IoWatchOutline size={50} color={index === selectedCategoryIndex ? 'white' : null} />
            caption = 'SmartWatch'
            break;
        case 3:
            content = <IoCameraOutline size={50} color={index === selectedCategoryIndex ? 'white' : null} />
            caption = 'Camera'
            break;
        case 4:
            content = <CiHeadphones size={50} color={index === selectedCategoryIndex ? 'white' : null} />
            caption = 'HeadPhones'
            break;
        case 5:
            content = <PiGameControllerThin size={50} color={index === selectedCategoryIndex ? 'white' : null} />
            caption = 'Gaming'
            break;
    }
    return <div style={{ backgroundColor: index === selectedCategoryIndex ? '#ef4444' : null }} className='border-2 border-stone-200 rounded p-10 flex flex-col justify-center items-center gap-5 transition-all duration-150'>
        {content}
        <h4 style={{ color: index === selectedCategoryIndex ? 'white' : 'black' }}>{caption}</h4>
    </div>
}

const BrowseByCategory = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    return (
        <SectionLayout title="Categories" subtitle="Browse By Category" btn={false}>
            <div className='grid grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-10'>
                {Array.from({ length: 6 }, (_, index) => {
                    return <button key={index} onClick={() => setSelectedCategoryIndex(index)}>
                        <OutlineCategory index={index} selectedCategoryIndex={selectedCategoryIndex} />
                    </button>
                })}
            </div>
        </SectionLayout>
    )
}

export default BrowseByCategory