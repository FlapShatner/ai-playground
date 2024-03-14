import React from 'react'
import { AdvancedImage, placeholder } from '@cloudinary/react'
import { prompts } from '../prePrompt'
import { cn } from '../utils'
import { useAtom, useSetAtom } from 'jotai'
import { cld } from '../cloudinary'
import { generatedAtom, captionAtom, imageStyleAtom, detailModeAtom, isOrderingAtom } from '../atoms'

function GalleryItem({ item, i }) {
  const [generated, setGenerated] = useAtom(generatedAtom)
  const setCaption = useSetAtom(captionAtom)
  const setImageStyle = useSetAtom(imageStyleAtom)
  const setDetailMode = useSetAtom(detailModeAtom)
  const setIsOrdering = useSetAtom(isOrderingAtom)

  const isActive = item.url == generated.url
  const handleClick = () => {
    setGenerated(item)
    setDetailMode(false)
    setCaption(item.caption)
    setIsOrdering(false)
    const thisStyle = prompts.find((style) => style.id == item.style)
    if (!thisStyle) return
    setImageStyle(thisStyle)
  }

  const image = cld.image(item.publicId)

  const isGrid = item.shape?.grid

  return (
    <div onClick={handleClick} className='flex flex-col items-center  cursor-pointer' key={i}>
      <div
        className={cn(
          'w-32 h-32 object-cover overflow-hidden border border-border hover:border-accent flex items-center',
          isActive && 'border-accent',
          !isGrid && 'w-64'
        )}>
        <AdvancedImage plugins={[placeholder({ mode: 'blur' })]} cldImg={image} />
      </div>
      <p className='text-center text-txt-primary text-xs w-32 text-ellipsis overflow-hidden whitespace-nowrap'>{item.prompt}</p>
    </div>
  )
}

export default GalleryItem
