import React, { useState } from 'react'
import { cn } from '../utils'

function GridImage({ img, i, setActiveIndex, activeIndex }) {
  const handleSelect = (e) => {
    setActiveIndex(e.target.id)
  }
  return (
    <div key={i} className={cn('aspect-square overflow-hidden', activeIndex == img.label && 'border-2 border-accent-bright -m-[2px]')}>
      <img onClick={handleSelect} id={img.label} className='object-cover w-full h-full' src={img.url} alt='Generated image' />
    </div>
  )
}

export default GridImage
