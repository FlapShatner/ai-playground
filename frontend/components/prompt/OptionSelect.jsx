import React, { useState, useRef } from 'react'
import { cn } from '../utils'
import useIsSmall from '../hooks/useIsSmall'
import { useOnClickOutside } from 'usehooks-ts'
import Chevron from '../icons/Chevron'
import SelectOption from './SelectOption'
import { useAtom, useAtomValue } from 'jotai'
import { shapeAtom, sizeLabelAtom } from '../atoms'

function OptionSelect({ product, isChecked, handleSelect }) {
 const isSmall = useIsSmall()
 const [isOpen, setIsOpen] = useState(false)
 const sizeLabel = useAtomValue(sizeLabelAtom)
 const shape = useAtomValue(shapeAtom)
 const clickRef = useRef()
 useOnClickOutside(clickRef, () => setIsOpen(false))
 const handleClick = (e) => {
  e.stopPropagation()
  setIsOpen(!isOpen)
 }

 const showSizeLabel = shape.id.startsWith(product.id)
 const isShape = shape.id !== ''

 const len = product.options.length
 return (
  <div
   ref={clickRef}
   className={cn('w-full cursor-pointer relative rounded-b-md', !isChecked && 'opacity-50 pointer-events-none')}>
   <div
    onClick={handleClick}
    className={cn(
     'flex justify-between border border-border rounded-md pl-2 py-1 bg-bg-secondary items-center ',
     isShape && 'border border-accent-tr bg-transparent',
     isOpen && 'rounded-b-none',
     isSmall && 'text-sm'
    )}>
    {showSizeLabel ? sizeLabel : 'Select size'}
    <Chevron
     className={cn('sm:w-12')}
     color={'#d2ac53'}
     size='20'
     direction={isOpen ? 'up' : 'down'}
    />
   </div>
   <div className='absolute w-full bg-bg-tertiary z-10 rounded-b-md'>
    {isOpen &&
     product.options.map((option, i) => (
      <SelectOption
       len={len}
       i={i}
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
