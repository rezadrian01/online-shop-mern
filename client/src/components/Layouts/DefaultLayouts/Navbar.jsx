import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import { GoSearch, GoHeart, GoPerson } from 'react-icons/go';
import { IoCartOutline, IoMenuOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import { authActions } from '@/store';
import { LIST_NAVBAR } from '@/constants/listNavbar'
import EachUtils from '@/utils/EachUtils'
import { LIST_DROPDOWN_ACCOUNT_MENU } from '@/constants/listDropdownMenu';
import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@/utils/apiInstance';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomepage = location.pathname === '/';
    const [isOpenDropdownAccount, setIsOpenDropdownAccount] = useState(false);
    const authData = useSelector(state => state.auth)

    const { data: userData, isLoading: isLoadingUserData } = useQuery({
        queryKey: ['user', { userId: authData.userId }],
        queryFn: async () => {
            const response = await apiInstance(`/user/${authData.userId}`)
            return response.data.data
        },
        enabled: (authData.token && authData.userId) ? true : false
    })

    const toggleDropdownAccount = () => {
        setIsOpenDropdownAccount(!isOpenDropdownAccount)
    }
    // console.log(userData?.wishlist)

    return (
        <header>
            <nav className='grid grid-cols-3 lg:grid-cols-12 gap-2 w-full pt-8 pb-4 border-b-2 border-b-stone-200 px-2 md:px-10 lg:px-14 xl:px-24 text-center items-center' style={{ marginBottom: isHomepage ? '0rem' : '4rem' }}>
                <div className='col-span-1 lg:col-span-2 text-left'>
                    <Link to='/'>
                    <h3 className='font-bold text-xl lg:text-3xl'>Exclusive</h3>
                    </Link>
                </div>
                <ul className=' lg:col-span-7 hidden lg:flex gap-2 lg:gap-16 justify-center'>
                    <EachUtils of={LIST_NAVBAR} render={(item, index) => {
                        return <li className={`text-base lg:text-lg relative pb-1`} key={index}><Link to={item.url}>{item.title}</Link>
                            {location.pathname === item.url && <motion.span layoutId='navbar-menu' className='absolute inset-x-0 border border-stone-800 bottom-0' />}
                        </li>
                    }} />
                </ul>
                <div className='col-span-3 grid grid-cols-9 gap-4 pr-0 items-center'>
                    <div className='relative col-span-6'>
                        <input className='w-full bg-slate-100 py-2 px-3 outline-none' placeholder='Search...' />
                        <button>
                            <GoSearch className='absolute right-2 bottom-[.6rem] cursor-pointer' size={20} />
                        </button>
                    </div>
                    {!isLoadingUserData && <div className='col-span-3 flex  gap-4 md:gap-10 lg:gap-4 mx-auto'>
                        <div className='relative'>
                            <button onClick={() => navigate('/wishlist')} className=''>
                            <GoHeart
                                size={23}
                                className='mx-auto'
                                />
                                {userData.wishlist.length > 0 && <div className='bg-red-500 w-4 flex justify-center items-center aspect-square rounded-full absolute -right-2 -top-1 text-[.6rem] text-white'>{userData.wishlist.length}</div>}
                        </button>
                        </div>
                        <div className='relative'>
                            <button onClick={() => navigate('/cart')} className=''>
                                <IoCartOutline size={23} className='mx-auto ' />
                                {userData?.cart?.length > 0 && <div className='bg-red-500 w-4 flex justify-center items-center aspect-square rounded-full absolute -right-2 -top-1 text-[.6rem] text-white'>{userData.cart.length}</div>}
                        </button>
                        </div>
                        {/* render conditionaly */}

                        <div className='relative'>
                            <button onClick={toggleDropdownAccount}>
                                <VscAccount size={23} className='' />
                            </button>
                            {isOpenDropdownAccount && <>
                                <div onClick={() => setIsOpenDropdownAccount(false)} className='fixed inset-0 z-20' />
                                <div className='absolute bg-gray-900/30 backdrop-blur-md text-slate-50 z-20 right-0 top-10 py-3 px-4 rounded flex flex-col gap-4 w-[14rem] text-sm'>
                                    <EachUtils of={LIST_DROPDOWN_ACCOUNT_MENU} render={(item, index) => {
                                        return <DropdownAccountContent index={index} item={item} closeDropdown={toggleDropdownAccount} />
                                    }} />
                                </div>
                            </>
                            }
                        </div>
                    </div>}

                </div>
                {/* mobile screen */}
                <ul className='col-span-3 flex lg:hidden gap-2 lg:gap-16 justify-evenly mt-2'>
                    <EachUtils of={LIST_NAVBAR} render={(item, index) => {
                        return <li className={`text-base lg:text-lg relative pb-1`} key={index}><Link to={item.url}>{item.title}</Link>
                            {location.pathname === item.url && <motion.span layoutId='navbar-menu-mobile' className='absolute inset-x-0 border border-stone-800 bottom-0' />}
                        </li>
                    }} />
                </ul>
            </nav>
        </header>
    )
}

export default Navbar

const DropdownAccountContent = ({ item, index, closeDropdown }) => {
    const dispatch = useDispatch();
    let logo;
    switch (index) {
        case 0:
            logo = <GoPerson size={20} />
            break;
        case 1:
            logo = <FiShoppingBag size={20} />
            break;
        case 2:
            logo = <MdOutlineCancel size={20} />
            break;
        case 3:
            logo = <FaRegStar size={20} />
            break;
        case 4:
            logo = <CiLogout size={20} />
            break;
    }
    return <div className='flex gap-5 items-center'>
        {logo}
        {index !== 4 && <a className='w-full text-left' href={item.url}>{item.title}</a>}
        {index === 4 && <button className='w-full text-left' onClick={() => {
            closeDropdown()
            dispatch(authActions.signout())
        }} >{item.title}</button>}
    </div>
}