import React from 'react'
import { cn } from '../utils'
import { cld } from '../cloudinary'
import { AdvancedImage, placeholder } from '@cloudinary/react'
import { useAtom } from 'jotai'
import { activeIndexAtom, detailModeAtom, detailImageAtom } from '../atoms'

function GridImage({ img, i }) {
  const [activeIndex, setActiveIndex] = useAtom(activeIndexAtom)
  const [detailMode, setDetailMode] = useAtom(detailModeAtom)
  const [detailImage, setDetailImage] = useAtom(detailImageAtom)
  const handleSelect = (e) => {
    setActiveIndex({ id: e.target.id, index: i })
    setDetailMode(true)
    setDetailImage(img)
  }
  return (
    <div key={i} onClick={handleSelect} className={cn('aspect-square overflow-hidden hover:border-2 hover:border-accent hover:-m-[2px]')}>
      <AdvancedImage plugins={[placeholder({ mode: 'blur' })]} className='cursor-pointer object-cover w-full h-full' cldImg={img.image} />
      {/* <img onClick={handleSelect} id={img.label} className='cursor-pointer object-cover w-full h-full' src={img.url} alt='Generated image' /> */}
    </div>
  )
}

export default GridImage
