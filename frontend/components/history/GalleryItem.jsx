import React from 'react'
import { AdvancedImage, placeholder } from '@cloudinary/react'
import { prompts } from '../prePrompt'
import { cn } from '../utils'
import { useAtom } from 'jotai'
import { cld } from '../cloudinary'
import { generatedAtom, captionAtom, imageStyleAtom, detailModeAtom, isOrderingAtom } from '../atoms'

function GalleryItem({ item, i }) {
  const [caption, setCaption] = useAtom(captionAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [imageStyle, setImageStyle] = useAtom(imageStyleAtom)
  const [detailMode, setDetailMode] = useAtom(detailModeAtom)
  const [isOrdering, setIsOrdering] = useAtom(isOrderingAtom)

  const isActive = item.url == generated.url
  const handleClick = () => {
    setGenerated({ url: item.url, publicId: item.publicId, meta: item.meta, up: item.up })
    setDetailMode(false)
    setCaption(item.prompt)
    setIsOrdering(false)
    const thisStyle = prompts.find((style) => style.id == item.style)
    if (!thisStyle) return
    setImageStyle(thisStyle)
  }

  const image = cld.image(item.publicId)

  return (
    <div onClick={handleClick} className='flex flex-col items-center cursor-pointer' key={i}>
      <div className={cn('w-32 h-32 object-cover border border-border hover:border-accent', isActive && 'border-accent')}>
        <AdvancedImage plugins={[placeholder({ mode: 'blur' })]} cldImg={image} />
      </div>
      <p className='text-center text-txt-primary text-xs w-32 text-ellipsis overflow-hidden whitespace-nowrap'>{item.prompt}</p>
    </div>
  )
}

export default GalleryItem
