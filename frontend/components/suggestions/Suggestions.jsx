import React, { useEffect, useRef, lazy, Suspense } from 'react'
import Modal from 'react-modal'
import useIsSmall from '../hooks/useIsSmall'
import { useLockedBody } from 'usehooks-ts'
import SingleSuggestion from './SingleSuggestion'
import SuggFallback from './SuggFallback'
import LeftArrow from '../icons/leftArrow'
import Arrow from '../icons/Arrow'
import { useAtom, useAtomValue } from 'jotai'
import { modalIsOpenAtom, suggestionsAtom } from '../atoms'

function Suggestions() {
 const isSmall = useIsSmall()
 // const SingleSuggestion = lazy(() => import('./SingleSuggestion'))
 const [locked, setLocked] = useLockedBody(false, 'root')
 const [modalIsOpen, setModalIsOpen] = useAtom(modalIsOpenAtom)
 const suggestions = useAtomValue(suggestionsAtom)
 const container = useRef(null)
 const scroll = (direction) => {
  if (container.current) {
   if (direction === 'left') {
    container.current.scrollLeft -= 150
   } else {
    container.current.scrollLeft += 150
   }
  }
 }
 const customStyles = {
  overlay: {
   backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
   padding: '0',
   top: '60%',
   left: '50%',
   maxWidth: isSmall ? '90%' : '60%',
   maxHeight: '60%',
   backgroundColor: '#1A1A1A',
   right: 'auto',
   bottom: 'auto',
   marginRight: '-50%',
   transform: 'translate(-50%, -50%)',
   zIndex: 1000,
  },
 }

 const handleClose = () => {
  setLocked(false)
  setModalIsOpen(false)
 }
 useEffect(() => {
  setLocked(modalIsOpen)
  return () => setLocked(false)
 }, [modalIsOpen])
 return (
  <Modal
   ariaHideApp={false}
   style={customStyles}
   isOpen={modalIsOpen}
   shouldCloseOnEsc={true}
   shouldCloseOnOverlayClick={true}
   onRequestClose={handleClose}>
   <div
    onClick={handleClose}
    className='ml-4 my-3 border border-border w-max p-2 flex items-center gap-2 text-xs cursor-pointer hover:text-accent hover:bg-bg-primary'>
    <LeftArrow
     width='16'
     color='#d2ac53'
    />
    Back To Your AI Design
   </div>
   <p className='text-txt-primary text-lg mx-4 my-2'>While you wait, here are some of our designs you might like!</p>
   <div className='flex items-center'>
    <div
     onClick={() => scroll('left')}
     className='cursor-pointer absolute rounded-full p-2 ml-2 flex top-36 bg-bg-primary opacity-80 hover:opacity-100'>
     <Arrow
      className='pr-1 text-accent'
      direction='left'
      size='26px'
     />
    </div>
    <div
     ref={container}
     className='overflow-x-scroll gap-4 flex px-4 scroll-smooth'>
     {suggestions.length > 0 &&
      suggestions.map((s, i) => (
       <SingleSuggestion
        key={i}
        s={s}
       />
      ))}
    </div>
    <div
     onClick={() => scroll('right')}
     className='cursor-pointer absolute rounded-full p-2 mr-2 flex right-0 top-36 bg-bg-primary opacity-80 hover:opacity-100'>
     <Arrow
      className='pl-1 text-accent'
      direction='right'
      size='26px'
     />
    </div>
   </div>
  </Modal>
 )
}

export default Suggestions
