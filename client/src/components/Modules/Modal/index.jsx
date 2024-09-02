import React from 'react'

import { animate, motion } from 'framer-motion'
import { createPortal } from 'react-dom';

const DefaultModal = ({ setClose, isClose, animate = false, opacity = 1, missing = true, slideDirection = 'right', directionValue = null, children }) => {

    const { xValue, yValue } = getDirectionValue(slideDirection, directionValue);
    return (
        createPortal(<>
            <div onClick={setClose} className='bg-black/30 fixed z-10 inset-0' />

            {!animate && <dialog className='z-30' open onClose={setClose}>
                {children}
            </dialog>}

            {animate &&
                <motion.dialog
                variants={{
                    initial: { y: yValue, x: xValue, opacity },
                        animate: { y: 0, x: 0, opacity: 1 },
                    exit: { y: yValue, x: xValue, opacity }
                }}
                    initial={missing && 'initial'}
                    animate={(missing && 'animate') || (isClose ? 'initial' : 'animate')}
                    exit={missing && 'exit'}
                    open
                    onClose={setClose}
                    className='bg-white p-4 fixed z-10'
                >
                    {children}
                </motion.dialog>}
        </>, document.getElementById('modal-root'))
    )
}

const SidebarModal = ({ children, slideDirection = 'right', directionValue = -400, setClose, isClose, openDirectionValue = -200, overlay = true }) => {
    const { xValue } = getDirectionValue(slideDirection, directionValue)
    return <>
        {overlay && <div className='fixed z-10 inset-0 bg-black/30' onClick={setClose} style={{ display: isClose ? 'none' : 'block' }} />}
        <motion.dialog
            variants={{
                animate: { x: isClose ? xValue : openDirectionValue, transition: { ease: 'easeInOut' } }
            }}
            animate='animate'
            open
            className='bg-white p-4 z-10'
        >
            {children}
        </motion.dialog>
    </>
}

const getDirectionValue = (slideDirection, directionValue) => {
    let xValue = 0;
    let yValue = 0;
    switch (slideDirection) {
        case 'right':
            xValue = directionValue || -100;
            break;
        case 'left':
            xValue = directionValue || 100
            break;
        case 'top':
            yValue = directionValue || 100;
            break;
        case 'bottom':
            yValue = directionValue || -100;
            break;
    }
    return { xValue, yValue }
}

export default DefaultModal
export { SidebarModal }