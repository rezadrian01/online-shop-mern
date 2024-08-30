import React, { useEffect, useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import EachUtils from '@/utils/EachUtils'

const Carousel = ({ width = 1200, images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const next = () => {
        setCurrentImageIndex(prevState => {
            return prevState === images.length - 1 ? 0 : prevState + 1
        })
    }

    const prev = () => {
        setCurrentImageIndex(prevState => {
            return prevState === 0 ? images.length - 1 : prevState - 1
        })
    }

    useEffect(() => {
        const timer = setInterval(next, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <div
                className="flex relative overflow-hidden w-full mx-auto"
                style={{ maxWidth: width }}
            >
                {/* <div className='absolute z-10 flex w-full h-full items-center justify-between'>
                    <button onClick={prev}>
                        <GoChevronLeft size={30} />
                    </button>
                    <button onClick={next}>
                        <GoChevronRight size={30} />
                    </button>
                </div> */}
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2'>
                    <EachUtils of={images} render={(item, index) => {
                        return <button onClick={() => setCurrentImageIndex(index)} key={index} className='w-2 aspect-square rounded-full border border-slate-200' style={{ backgroundColor: `${index === currentImageIndex ? '#f2f2f2' : 'transparent'}` }} />
                    }} />
                </div>
                <EachUtils of={images} render={(item, index) => {
                    return <img key={index} className="transition-transform duration-300 object-cover" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }} src={item.src} alt={item.alt} />
                }} />
            </div>
        </>
    )
}

export default Carousel