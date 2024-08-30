import React from 'react'

const SectionLayout = ({ title, subtitle, btn = true, btnCaption, btnPosition = 'bottom', btnOutline = false, btnOnClick, children }) => {
    return (
        <section className='border-b-2 border-b-stone-200 pb-16'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-4 items-center mb-6'>
                        <div className='bg-red-500 rounded-md w-6 h-14' />
                        <h2 className='text-red-500 font-semibold text-xl'>{title}</h2>
                    </div>
                    <div className='flex justify-between items-center mb-6'>
                        <h3 className='font-semibold text-3xl'>{subtitle}</h3>
                        {btnPosition === 'right' && btn && <button onClick={btnOnClick} className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded'>{btnCaption}</button>}
                    </div>
                </div>
                <div>
                    {children}
                </div>
                {btnPosition === 'bottom' && btn && <div className='mx-auto mt-10'>
                    <button onClick={btnOnClick} className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded'>{btnCaption}</button>
                </div>
                }
            </div>
        </section>
    )
}

export default SectionLayout