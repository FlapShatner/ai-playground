import React, { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from '../utils'
import HistoryModal from './HistoryModal'
import GalleryItem from './GalleryItem'

function Gallery() {
  const [history, setHistory] = useLocalStorage('history-new', [])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <p
        onClick={() => setIsOpen(!isOpen)}
        className='my-2 mx-auto sm:w-max text-center border-b border-b-border text-txt-primary cursor-pointer'>
        History
      </p>
      <div className='flex m-auto bg-bg-secondary relative max-w-[90vw] sm:w-full border border-border rounded-md pt-2 mb-4 '>
        <HistoryModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className={cn('flex gap-3 px-2 overflow-x-scroll w-full min-h-28')}>
          {history.length > 0 &&
            history.map((item, i) => (
              <GalleryItem
                item={item}
                key={i}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Gallery
