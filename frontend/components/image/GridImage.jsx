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
    <div
      key={i}
      className={cn(
        'aspect-square overflow-hidden hover:border-2 hover:border-accent hover:-m-[2px]',
        activeIndex?.id == img.label && 'border-4 border-accent-bright -m-[4px] hover:border-4 hover:border-accent-bright hover:-m-[4px] '
      )}>
      <img onClick={handleSelect} id={img.label} className='cursor-pointer object-cover w-full h-full' src={img.url} alt='Generated image' />
    </div>
  )
}

export default GridImage
