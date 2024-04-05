import React, { useState } from 'react';
import { cn } from '../utils';
import CloseIcon from '../icons/CloseIcon';
import { useAtom } from 'jotai'
import { isPromoOpenAtom } from '../atoms'
import Modal from 'react-modal'

const Promo = () => {
    const logo = 'https://cdn.shopify.com/s/files/1/0830/7005/8780/files/Ink-Monkey-Logo_7f78120b-542f-48a7-925d-e487e11dd4b1.jpg?v=1695869751'
    const bub = 'https://cdn.shopify.com/s/files/1/0830/7005/8780/files/bub.png?v=1712162024'
    const [showInfo, setShowInfo] = useState(false)
    const [isPromoOpen, setIsPromoOpen] = useAtom(isPromoOpenAtom)


    const handleClick = () => {
        setShowInfo(!showInfo)
    }

    const handleClose = () => {
        setIsPromoOpen(false)
    }

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 999,
        },
        content: {
            border: '1px solid #222',
            padding: '0',
            top: '60%',
            left: '50%',
            maxWidth: '80%',
            maxHeight: '70%',
            backgroundColor: 'black',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
        },
    }

    return (
        <Modal
            style={customStyles}
            isOpen={isPromoOpen}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleClose}>
            <div className='relative w-min pr-8 pt-8'>
                <CloseIcon
                    onClick={handleClose}
                    className='absolute z-10 right-4 top-4 cursor-pointer'
                />
                <div className='w-[800px] relative  bg-black overflow-hidden '>
                    <div className='flex  justify-end'>
                        <img className='w-1/2 mt-28' src={logo} alt="ink monkey logo" />
                        <div className='relative -ml-32'>
                            <img className=' bubble' src="https://cdn.shopify.com/s/files/1/0830/7005/8780/files/bub.png?v=1712162024" alt="" />

                            <div className='absolute top-0 w-full bubble'>
                                <p className='text-center text-2xl font-bold text-blue-600 mt-8'>CONGRATULATIONS!</p>
                                <p className='text-center font-bold text-xl text-bg-secondary' >You're one of our first customers!</p>
                                <p className='text-bg-secondary text-center text-lg w-4/5 m-auto '>To show our appreciation, if you purchase one of your back window designs, we are going to let you create <span className='font-bold text-blue-600'>2 free 4" custom decals</span> using our FONZAI design center</p>
                                <p onClick={handleClick} className='cursor-pointer text-blue-600 text-center text-lg mt-3 underline'>Click here for more info</p>
                            </div>
                        </div>
                    </div>
                    {showInfo && <div className='absolute bottom-2 right-0 w-1/2'>
                        <Paragraph>Add your truck back window design to your shopping cart</Paragraph>
                        <Paragraph>Return back to our FONZAI design playground</Paragraph>
                        <Paragraph>Select "Decal" for product</Paragraph>
                        <Paragraph>Select 4" for size</Paragraph>
                        <Paragraph>Design your decal</Paragraph>
                        <Paragraph>Add your decal to the shopping cart</Paragraph>
                        <Paragraph subText={true}>(Your decal will show up as $0.00 on final check out)</Paragraph>
                        <Paragraph>Next repeat the process for your 2nd free decal</Paragraph>
                        <Paragraph subText={true}>(You do not have to create your own decal, if you would rather choose one of our decals from our inventory of thousands of decals)</Paragraph>
                    </div>}
                </div>
            </div>
        </Modal>
    );
}

const Paragraph = ({ children, subText }) => {

    return (
        <p className={cn('text-sm text-center mt-[5px]', subText && 'text-xs -mt-1')}>{children}</p>
    )
}

export default Promo;
