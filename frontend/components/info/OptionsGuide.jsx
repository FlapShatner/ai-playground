import React, { useState } from 'react'
import Modal from 'react-modal'
import Help from '../icons/Help'
import CloseIcon from '../icons/CloseIcon'
import { useEffect } from 'react'
import { useLockedBody } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { optionsGuideAtom } from '../atoms'
import { content } from './optionsContent.js'

function OptionsGuide() {
 const [locked, setLocked] = useLockedBody(false, 'root')
 const [optionsGuide, setOptionsGuide] = useAtom(optionsGuideAtom)
 useEffect(() => {
  setLocked(optionsGuide)
  return () => setLocked(false)
 }, [optionsGuide])
 const customStyles = {
  overlay: {
   backgroundColor: 'rgba(0,0,0,0.8)',
   zIndex: 999,
  },
  content: {
   padding: '0',
   top: '50%',
   left: '50%',
   maxWidth: '900px',
   maxHeight: '80%',
   backgroundColor: '#1A1A1A',
   right: 'auto',
   bottom: 'auto',
   marginRight: '-50%',
   transform: 'translate(-50%, -50%)',
   zIndex: 1000,
  },
 }
 return (
  <>
   <Modal
    style={customStyles}
    isOpen={optionsGuide}
    shouldCloseOnEsc={true}
    shouldCloseOnOverlayClick={true}
    onRequestClose={() => setOptionsGuide(false)}>
    <div className='flex justify-between p-4 px-8'>
     <CloseIcon
      onClick={() => setOptionsGuide(false)}
      className=' cursor-pointer absolute right-2 top-2'
     />
     <div className='flex flex-col gap-2'>
      {content.map((item, index) => (
       <div
        key={index}
        className='flex flex-col'>
        <p className='text-xl font-bold text-accent'>{item.title}:</p>
        <p className='text-base font-normal'>{item.desc}</p>
       </div>
      ))}
     </div>
    </div>
   </Modal>
  </>
 )
}

export default OptionsGuide
