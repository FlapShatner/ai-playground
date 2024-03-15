import React, { useState, useRef } from 'react'
import { cn } from '../utils'
import Chevron from '../icons/Chevron'
import { useOnClickOutside } from 'usehooks-ts'

function VariantSelect({ variants, size, setSize, setProductPrice }) {
 const [isHover, setIsHover] = useState(null)
 const [isOpen, setIsOpen] = useState(false)
 const [label, setLabel] = useState('0in')
 const ref = useRef()
 const handleClick = (e) => {
  e.stopPropagation()
  setIsOpen(!isOpen)
 }

 const handleClickOutside = () => {
  setIsOpen(false)
 }

 useOnClickOutside(ref, handleClickOutside)

 return (
  <div className={cn('mt-4 m-max relative ml-auto')}>
   <span className={cn('mr-auto text-lg')}>Size</span>
   <div className=' m-auto'>
    <div
     onClick={handleClick}
     className={cn('cursor-pointer border border-border flex items-center justify-between gap-4 w-max bg-bg-secondary py-2 px-5')}>
     <p className='text-xl font-bold'>{label}</p>
     <Chevron
      className='ml-auto h-10 w-12 sm:w-8 flex flex-col items-center bg-accent bg-opacity-[.0125]'
      direction='down'
     />
    </div>
    <div
     ref={ref}
     className='absolute bg-bg-secondary  z-10'>
     {isOpen &&
      variants.map((item, i) => {
       const handleClick = () => {
        setIsOpen(false)
        setSize(item.id)
        setLabel(item.title)
        setProductPrice(item.price)
       }

       const isSelected = item.id === size
       return (
        <div
         key={item.id}
         onClick={handleClick}
         onMouseEnter={() => setIsHover(item.id)}
         onMouseLeave={() => setIsHover(null)}
         className={cn(
          'cursor-pointer py-2 px-2 w-[121px] border border-border flex items-center gap-4 hover:border-accent hover:bg-bg-secondary transition-transform ease-in-out'
         )}>
         <span className={cn('text-txt-primary text-base', isSelected && 'text-accent')}>{item.title}</span>
        </div>
       )
      })}
    </div>
   </div>
  </div>
 )
}

export default VariantSelect
