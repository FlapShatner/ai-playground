import React from 'react'
import { cn } from '../utils'
import { AdvancedImage, placeholder } from '@cloudinary/react'
import { useSetAtom } from 'jotai'
import { activeIndexAtom, detailModeAtom, detailImageAtom } from '../atoms'

function GridImage({ img, i }) {
  const setActiveIndex = useSetAtom(activeIndexAtom)
  const setDetailMode = useSetAtom(detailModeAtom)
  const setDetailImage = useSetAtom(detailImageAtom)
  const handleSelect = (e) => {
    setActiveIndex({ id: e.target.id, index: i })
    setDetailMode(true)
    setDetailImage(img)
  }
  return (
    <div key={i} onClick={handleSelect} className={cn('overflow-hidden hover:border-2 hover:border-accent hover:-m-[2px]')}>
      <AdvancedImage plugins={[placeholder({ mode: 'blur' })]} className='cursor-pointer object-cover w-full h-full ' cldImg={img.image} />
    </div>
  )
}

export default GridImage
