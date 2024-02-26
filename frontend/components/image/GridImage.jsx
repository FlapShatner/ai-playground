import React from 'react'
import { cn } from '../utils'
import { useAtom } from 'jotai'
import { activeIndexAtom } from '../atoms'

function GridImage({ img, i }) {
  const [activeIndex, setActiveIndex] = useAtom(activeIndexAtom)
  const handleSelect = (e) => {
    setActiveIndex({ id: e.target.id, index: i })
  }
  return (
    <div key={i} className={cn('aspect-square overflow-hidden', activeIndex?.id == img.label && 'border-2 border-accent-bright -m-[2px]')}>
      <img onClick={handleSelect} id={img.label} className='object-cover w-full h-full' src={img.url} alt='Generated image' />
    </div>
  )
}

export default GridImage
