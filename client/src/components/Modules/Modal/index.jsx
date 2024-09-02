import React from 'react'

import { motion } from 'framer-motion'

const DefaultModal = ({ setClose, animate = false, opacity = 1, slideDirection = 'right', children }) => {

    const { xValue, yValue } = getDirectionValue(slideDirection)
    return (
        <>
            <div onClick={setClose} className='bg-black/30 fixed inset-0' />

            {!animate && <dialog className='z-30' open onClose={setClose}>
                {children}
            </dialog>}

            {animate && <motion.dialog className='z-30'
                variants={{
                    initial: { y: yValue, x: xValue, opacity },
                    animate: { y: yValue, x: xValue, opacity: 1 },
                    exit: { y: yValue, x: xValue, opacity }
                }}
                initial='intial'
                animate='animate'
                exit='exit'
                open onClose={setClose}>
                {children}
            </motion.dialog>}
        </>
    )
}

const getDirectionValue = (slideDirection) => {
    let xValue = 0;
    let yValue = 0;
    switch (slideDirection) {
        case 'right':
            xValue = 100;
            break;
        case 'left':
            xValue = -100
            break;
        case 'top':
            yValue = 100;
            break;
        case 'bottom':
            yValue = -100;
            break;
    }
    return { xValue, yValue }
}

export default DefaultModal