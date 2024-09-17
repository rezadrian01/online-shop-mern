import React, { useState } from 'react'

import AddressBook from '@mods/SectionContents/MyAccount/AddressBook'
import MyCancellations from '@mods/SectionContents/MyAccount/MyCancellations'
import MyPayment from '@mods/SectionContents/MyAccount/MyPayment'
import MyProfile from '@mods/SectionContents/MyAccount/MyProfile'
import MyReturns from '@mods/SectionContents/MyAccount/MyReturns'
import Options from '@mods/SectionContents/MyAccount/Options'
import { LIST_ACCOUNT_NAVIGATION } from '@/constants/listMyAccountNavigation'
import EachUtils from '@/utils/EachUtils'
import { AnimatePresence } from 'framer-motion'
import DefaultModal, { SidebarModal } from '@/components/Modules/Modal'
import SellProduct from '@/components/Modules/SectionContents/MyAccount/SellProduct'

const MyAccount = () => {
    const [selectedMenu, setSelectedMenu] = useState('My Profile');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const resetMenu = () => {
        setSelectedMenu("My Profile")
    }
    return (
        <div className='relative grid grid-cols-8 gap-x-4 gap-y-20 pt-6 lg:pt-10 pb-24'>
            {/*<div className='flex justify-end col-span-8'>
                <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
            </div>
             <SidebarModal isClose={!isModalOpen} setClose={() => setIsModalOpen(false)} overlay={true}>
                <p className='min-h-screen'>Modal Testing</p>
            </SidebarModal> */}

            <div className='hidden lg:block col-span-2 '>
                <Navigation selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            </div>
            <div className='col-span-8 lg:col-span-6 border rounded-lg px-2 lg:px-16 py-6 shadow-md'>
                <CurrentContent resetMenu={resetMenu} selectedMenu={selectedMenu} />
            </div>
        </div>
    )
}

const Navigation = ({ selectedMenu, setSelectedMenu }) => {
    return <div className='flex flex-col gap-4 text-stone-500'>
        <EachUtils of={LIST_ACCOUNT_NAVIGATION} render={(item, index) => {
            return <div key={index}>
                <h3 className='font-semibold tracking-wide text-black'>{item.title}</h3>
                <ul className='px-10'>
                    <EachUtils of={item.contents} render={(content, index) => {
                        return <li className='cursor-pointer' onClick={() => setSelectedMenu(content)} key={index} style={{ color: selectedMenu === content ? 'rgb(239 68 68)' : 'inherit' }}>
                            {content}
                        </li>
                    }} />
                </ul>
            </div>
        }} />
    </div>
}

const CurrentContent = ({ selectedMenu, resetMenu }) => {
    let content;
    switch (selectedMenu) {
        case 'My Profile':
            content = <MyProfile />
            break;
        case 'Address Book':
            content = <AddressBook />
            break;
        case 'My Payment Options':
            content = <MyPayment />
            break;
        case 'Options':
            content = <Options />
            break;
        case 'My Returns':
            content = <MyReturns />
            break;
        case 'My Cancellations':
            content = <MyCancellations />
            break;
        case 'Sell Product':
            content = <SellProduct resetMenu={resetMenu} />
            break;
    }
    return <>
        {content}
    </>
}

export default MyAccount