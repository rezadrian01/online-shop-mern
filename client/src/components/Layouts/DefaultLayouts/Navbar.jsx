import { listNavbar } from '@/constants/listNavbar'
import EachUtils from '@/utils/EachUtils'
import React from 'react'
import { Link } from 'react-router-dom'
import { GoSearch, GoHeart } from 'react-icons/go'
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
    return (
        <header>
            <nav className='grid grid-cols-12 gap-2 w-full pt-8 pb-4 border-b-2 border-b-stone-200 px-2 md:px-10 lg:px-24 text-center items-center'>
                <div className='col-span-3'>
                    <h3 className='font-bold text-3xl'>Exclusive</h3>
                </div>
                <ul className='col-span-6 flex gap-16 justify-center'>
                    <EachUtils of={listNavbar} render={(item, index) => {
                        return <li className='text-base lg:text-lg' key={index}><Link to={item.url}>{item.title}</Link></li>
                    }} />
                </ul>
                <div className=' col-span-3 grid grid-cols-10 gap-4'>
                    <div className='relative col-span-8'>
                        <input className='w-full bg-slate-100 py-2 px-3 outline-none' placeholder='What are you looking for' />
                        <button>
                            <GoSearch className='absolute right-2 bottom-[.6rem] cursor-pointer' size={20} />
                        </button>
                    </div>
                    <button className='col-span-1'>
                        <GoHeart size={20} />
                    </button>
                    <button className='col-span-1'>
                        <IoCartOutline size={20} />
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar