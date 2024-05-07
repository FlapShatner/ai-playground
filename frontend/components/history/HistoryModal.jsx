import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { cn } from '../utils'
import { prompts } from '../prePrompt'
import { useLocalStorage, useLockedBody } from 'usehooks-ts'
import CloseIcon from '../icons/CloseIcon'
import { useAtom, useSetAtom } from 'jotai'
import { generatedAtom, captionAtom, imageStyleAtom, detailModeAtom, isOrderingAtom } from '../atoms'

function HistoryModal({ isOpen, setIsOpen }) {
 const [history, setHistory] = useLocalStorage('history-new', [])
 const [locked, setLocked] = useLockedBody(false, 'root')
 const [generated, setGenerated] = useAtom(generatedAtom)
 const setCaption = useSetAtom(captionAtom)
 const setImageStyle = useSetAtom(imageStyleAtom)
 const setIsOrdering = useSetAtom(isOrderingAtom)
 const setDetailMode = useSetAtom(detailModeAtom)
 useEffect(() => {
  setLocked(isOpen)
  return () => setLocked(false)
 }, [isOpen])

 const handleClose = () => {
  setLocked(false)
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
   maxWidth: '80%',
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
   <div className='flex justify-between p-4'>
    <h3 className='text-4xl text-accent'>History</h3>
    <CloseIcon
     onClick={handleClose}
     className=' cursor-pointer'
    />
   </div>
   <p className='text-xs mb-8 mt-1 px-4 w-96 m-auto'>
    Please note: Your designs are saved temporarily and will only be accessible on this device until your browser history is cleared.
   </p>
   <div className='flex flex-wrap gap-3 justify-center p-8'>
    {history.map((item, i) => {
     const isWindow = !item.shape?.grid
     const isActive = item.url == generated.url
     const handleClick = () => {
      setIsOrdering(false)
      setGenerated(item)
      setCaption(item.prompt)
      setIsOpen(false)
      setDetailMode(false)
      const thisStyle = prompts?.find((style) => style.id == item.style)
      if (!thisStyle) return
      setImageStyle(thisStyle)
     }
     return (
      <div
       onClick={handleClick}
       className='flex flex-col items-center cursor-pointer'
       key={i}>
       <div
        className={cn(
         'sm:w-40 sm:h-40 object-cover border border-border hover:border-accent flex items-center overflow-hidden',
         isActive && 'border-accent',
         isWindow && 'sm:w-80'
        )}>
        <img src={item.url} />
       </div>
       <p className='text-center text-txt-primary text-xs w-40 text-ellipsis overflow-hidden whitespace-nowrap'>{item.caption}</p>
      </div>
     )
    })}
   </div>
  </Modal>
 )
}

export default HistoryModal
