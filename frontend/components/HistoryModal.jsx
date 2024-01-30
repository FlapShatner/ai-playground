import React, { useEffect } from 'react'
import Modal from 'react-modal'
import { cn } from './utils'
import { useLocalStorage, useLockedBody } from 'usehooks-ts'
import CloseIcon from './icons/CloseIcon'

function HistoryModal({ setCaption, setGenerated, generated, setImageStyle, isOpen, setIsOpen }) {
  const [locked, setLocked] = useLockedBody(false, 'root')
  useEffect(() => {
    setLocked(isOpen)
    return () => setLocked(false)
  }, [isOpen])
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.8)',
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
      zIndex: 10000,
    },
  }
  const [history, setHistory] = useLocalStorage('history', [])
  return (
    <Modal style={customStyles} isOpen={isOpen} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsOpen(false)}>
      <div className='flex justify-between p-4'>
        <h3 className='text-4xl text-accent'>History</h3>
        <CloseIcon onClick={() => setIsOpen(false)} className=' cursor-pointer' />
      </div>
      <p className='text-xs mb-8 mt-1 px-4 w-96 m-auto'>
        Please note: Your designs are saved temporarily and will only be accessible on this device until your browser history is cleared.
      </p>
      <div className='flex flex-wrap gap-3 justify-center p-8'>
        {history.map((item, i) => {
          const isActive = item.url == generated
          const handleClick = () => {
            setGenerated(item.url)
            setCaption(item.prompt)
            setIsOpen(false)
            const thisStyle = prompts.find((style) => style.id == item.style)
            if (!thisStyle) return
            setImageStyle(thisStyle)
          }
          return (
            <div onClick={handleClick} className='flex flex-col items-center cursor-pointer' key={i}>
              <img className={cn('sm:w-40 sm:h-40 object-cover  border border-border hover:border-accent', isActive && 'border-accent')} src={item.url} />
              <p className='text-center text-txt-primary text-xs w-40 text-ellipsis overflow-hidden whitespace-nowrap'>{item.prompt}</p>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

export default HistoryModal
