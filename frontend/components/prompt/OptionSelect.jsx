import React, { useState, useRef } from 'react'
import { cn } from '../utils'
import { useOnClickOutside } from 'usehooks-ts'
import Chevron from '../icons/Chevron'
import SelectOption from './SelectOption'
import { useAtom } from 'jotai'
import { shapeAtom, sizeLabelAtom } from '../atoms'

function OptionSelect({ product, isChecked, handleSelect }) {
 const [isOpen, setIsOpen] = useState(false)
 const [sizeLabel, setSizeLabel] = useAtom(sizeLabelAtom)
 const [shape, setShape] = useAtom(shapeAtom)
 const clickRef = useRef()
 useOnClickOutside(clickRef, () => setIsOpen(false))
 const handleClick = (e) => {
  e.stopPropagation()
  setIsOpen(!isOpen)
 }

 const showSizeLabel = shape.id.startsWith(product.id)
 const isShape = shape.id !== ''

 return (
  <div
   ref={clickRef}
   className={cn('w-full cursor-pointer relative', !isChecked && 'opacity-50 pointer-events-none')}>
   <div
    onClick={handleClick}
    className={cn('flex justify-between border border-border pl-2 py-1 bg-bg-secondary items-center', isShape && 'border border-accent-tr bg-transparent')}>
    {showSizeLabel ? sizeLabel : 'Select size'}
    <Chevron
     className={cn('sm:w-12')}
     color={'#d2ac53'}
     size='20'
     direction={isOpen ? 'up' : 'down'}
    />
   </div>
   <div className='absolute w-full bg-bg-tertiary z-10'>
    {isOpen &&
     product.options.map((option, i) => (
      <SelectOption
       key={i}
       option={option}
       setIsOpen={setIsOpen}
      />
     ))}
   </div>
  </div>
 )
}

export default OptionSelect
