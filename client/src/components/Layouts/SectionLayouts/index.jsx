import DefaultButton from '@/components/Modules/Buttons/DefaultButton'
import React from 'react'

const SectionLayout = ({ borderBottom = true, title, subtitle, btn = true, btnCaption, btnPosition = 'bottom', btnOutline = false, btnOnClick, children, isTitle = true, lastContent = false }) => {
    return (
        <section className='border-b-stone-200 pb-16' style={{ borderBottomWidth: borderBottom ? '2px' : '0px', marginBottom: lastContent ? '10rem' : null }}>
            <div className='flex flex-col gap-4'>
                {isTitle && <div className='flex flex-col gap-2'>
                    <div className='flex gap-4 items-center mb-6'>
                        <div className='bg-red-500 rounded-md w-6 h-14' />
                        <h2 className='text-red-500 font-semibold text-xl'>{title}</h2>
                    </div>
                    <div className='flex justify-between items-center mb-6'>
                        <h3 className='font-semibold text-3xl'>{subtitle}</h3>
                        {btnPosition === 'right' && btn && <DefaultButton onClick={btnOnClick} className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded'>{btnCaption}</DefaultButton>}
                    </div>
                </div>}
                <div>
                    {children}
                </div>
                {btnPosition === 'bottom' && btn && <div className='mx-auto mt-10'>
                    <DefaultButton onClick={btnOnClick} className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded'>{btnCaption}</DefaultButton>
                </div>
                }
            </div>
        </section>
    )
}

export default SectionLayout