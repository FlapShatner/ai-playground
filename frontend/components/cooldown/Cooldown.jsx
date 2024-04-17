import React, { useState } from 'react';
import Modal from 'react-modal'
import { FacebookShareButton } from 'react-share';
import { useAtom } from 'jotai'
import { cooldownOpenAtom, timeLeftAtom, historyAtom } from '../atoms'
import CloseIcon from '../icons/CloseIcon'
import { cn } from '../utils'

const Cooldown = () => {
    const [isOpen, setIsOpen] = useAtom(cooldownOpenAtom)
    const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom)
    const [historyOpen, setHistoryOpen] = useAtom(historyAtom)
    const [email, setEmail] = useState('')
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleHistoryOpen = () => {
        setHistoryOpen(true)
        setIsOpen(false)
    }
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 999,
        },
        content: {
            padding: '0',
            top: '60%',
            left: '50%',
            width: '90%',
            maxWidth: '700px',
            maxHeight: '70%',
            backgroundColor: '#1A1A1A',
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
            isOpen={isOpen}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleClose}>
            <div>
                <CloseIcon
                    onClick={handleClose}
                    className='ml-auto mr-2 mt-2 cursor-pointer'
                />
                <p className='px-4 text-sm sm:text-base sm:px-8 py-2'>You have reached the maximum number of generations. You will be able to generate more designs in {timeLeft}. Please consider ordering a design or upscaling an existing one.</p>
                <div onClick={handleHistoryOpen} className={cn('m-4 sm:mx-auto p-4  sm:w-1/2 text-center text-black font-semibold bg-accent rounded-md cursor-pointer')}>
                    Your previous designs
                </div>
                {/* <div className='p-4 pt-2 m-auto'>
                    <FacebookShareButton
                        url={'https://www.ink-monkey.com/'}>
                        <div className={cn('border-2 border-accent p-4 text-center text-accent font-semibold bg-bg-secondary rounded-md cursor-pointer')}>
                            Share on Facebook
                        </div>
                    </FacebookShareButton>
                    <span>Sign up for emails to reset timeout once:</span>
                    <div className='flex mt-1'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} id="input" name="input" type="text" />
                        <div className='w-1/4 border-2 border-[#292929] border-l-0 flex justify-center cursor-pointer hover:bg-bg-primary'>Submit</div>
                    </div>
                </div> */}
            </div>
        </Modal>
    );
}

export default Cooldown;
