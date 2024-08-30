import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoSearch, GoHeart } from 'react-icons/go'
import { IoCartOutline, IoMenuOutline } from "react-icons/io5";

import { LIST_NAVBAR } from '@/constants/listNavbar'
import EachUtils from '@/utils/EachUtils'
import SlideinModal from '@/components/Modules/SlideinModal';

const Navbar = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <header>
            <nav className='grid grid-cols-3 lg:grid-cols-12 gap-2 w-full pt-8 pb-4 border-b-2 border-b-stone-200 px-2 md:px-10 lg:px-14 xl:px-24 text-center items-center'>
                <div className='col-span-1 lg:col-span-2 text-left'>
                    <h3 className='font-bold text-xl lg:text-3xl'>Exclusive</h3>
                </div>
                <ul className=' lg:col-span-7 hidden lg:flex gap-2 lg:gap-16 justify-center'>
                    <EachUtils of={LIST_NAVBAR} render={(item, index) => {
                        return <li className='text-base lg:text-lg' key={index}><Link to={item.url}>{item.title}</Link></li>
                    }} />
                </ul>
                <div className='col-span-3 grid grid-cols-9 gap-4 pr-0'>
                    <div className='relative col-span-7'>
                        <input className='w-full bg-slate-100 py-2 px-3 outline-none' placeholder='Search...' />
                        <button>
                            <GoSearch className='absolute right-2 bottom-[.6rem] cursor-pointer' size={20} />
                        </button>
                    </div>
                    <button className='col-span-1'>
                        <GoHeart size={20} className='mx-auto' />
                    </button>
                    <button className='col-span-1'>
                        <IoCartOutline size={20} className='mx-auto' />
                    </button>
                </div>
                {/* mobile screen */}
                <ul className='col-span-3 flex lg:hidden gap-2 lg:gap-16 justify-evenly mt-2'>
                    <EachUtils of={LIST_NAVBAR} render={(item, index) => {
                        return <li className='text-base lg:text-lg' key={index}><Link to={item.url}>{item.title}</Link></li>
                    }} />
                </ul>
            </nav>
            {isOpenModal && <SlideinModal
                setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />}
        </header>
    )
}

export default Navbar