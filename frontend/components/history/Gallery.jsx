import React, { useState } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { prompts } from '../prePrompt'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from '../utils'
import { useAtom } from 'jotai'
import { generatedAtom, captionAtom, imageStyleAtom, detailModeAtom } from '../atoms'
import HistoryModal from './HistoryModal'
import GalleryItem from './GalleryItem'

function Gallery() {
  const [caption, setCaption] = useAtom(captionAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [imageStyle, setImageStyle] = useAtom(imageStyleAtom)
  const [detailMode, setDetailMode] = useAtom(detailModeAtom)

  const [history, setHistory] = useLocalStorage('history', [])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <p onClick={() => setIsOpen(!isOpen)} className='my-2 mx-auto sm:w-max text-center border-b border-b-border text-txt-primary cursor-pointer'>
        History
      </p>
      <div className='flex m-auto bg-bg-secondary relative max-w-[90vw] sm:w-full border border-border pt-2 mb-4 '>
        <HistoryModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setCaption={setCaption}
          setGenerated={setGenerated}
          generated={generated}
          setImageStyle={setImageStyle}
        />
        <div className={cn('flex gap-3 px-2 overflow-x-scroll w-full min-h-28')}>
          {history.length > 0 && history.map((item, i) => <GalleryItem item={item} key={i} />)}
        </div>
      </div>
    </>
  )
}

export default Gallery
