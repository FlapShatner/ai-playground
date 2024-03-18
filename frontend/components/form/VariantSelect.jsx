import React, { useState, useRef } from 'react'
import { cn, getDecalSizes, makeLabel } from '../utils'
import Chevron from '../icons/Chevron'
import { useOnClickOutside } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { sizeAtom } from '../atoms'

function VariantSelect({ product }) {
 if (product == undefined) {
  return null
 }
 const variants = getDecalSizes(product)
 const [isHover, setIsHover] = useState(null)
 const [isOpen, setIsOpen] = useState(false)
 const [size, setSize] = useAtom(sizeAtom)

 const ref = useRef()
 const handleClick = (e) => {
  e.stopPropagation()
  setIsOpen(!isOpen)
 }

 const handleClickOutside = () => {
  setIsOpen(false)
 }

 useOnClickOutside(ref, handleClickOutside)

 const label = size ? makeLabel(size.title) : '0'

 return (
  <div className={cn('mt-4 m-max relative ml-auto')}>
   <span className={cn('mr-auto text-lg')}>Size</span>
   <div
    ref={ref}
    className='w-max m-auto'>
    <div
     onClick={handleClick}
     className={cn('cursor-pointer border border-border flex items-center justify-between gap-4 w-max bg-bg-secondary py-2 px-5')}>
     <p className={cn('text-xl font-bold', !size && 'opacity-0')}>{label}</p>
     <Chevron
      className='ml-auto h-10 w-12 sm:w-8 flex flex-col items-center bg-accent bg-opacity-[.0125]'
      direction='down'
     />
    </div>
    <div className='absolute bg-bg-secondary  z-10'>
     {isOpen &&
      variants.map((item, i) => {
       const handleClick = () => {
        setIsOpen(false)
        setSize(item)
       }

       const isSelected = item.id === size
       return (
        <div
         key={item.id}
         onClick={handleClick}
         onMouseEnter={() => setIsHover(item.id)}
         onMouseLeave={() => setIsHover(null)}
         className={cn(
          'cursor-pointer py-2 px-2 w-28 border border-border flex items-center gap-4 hover:border-accent hover:bg-bg-secondary transition-transform ease-in-out'
         )}>
         <span className={cn('text-txt-primary text-base m-auto', isSelected && 'text-accent')}>{makeLabel(item.title)}</span>
        </div>
       )
      })}
    </div>
   </div>
  </div>
 )
}

export default VariantSelect
