import React from 'react'
import { cn } from '../utils'
import QuantIcons from '../icons/QuantIcons'
import { useAtom } from 'jotai'
import { quantityAtom } from '../atoms'

function Quantity() {
 const [quantity, setQuantity] = useAtom(quantityAtom)
 const handleIncrement = () => {
  setQuantity(quantity + 1)
 }
 const handleDecrement = () => {
  if (quantity === 0) return
  setQuantity(quantity - 1)
 }

 return (
  <div className='flex flex-col justify-end'>
   <label htmlFor='quantity'>Quantity</label>
   <div className='flex'>
    <div
     onClick={handleDecrement}
     className='cursor-pointer px-4 border border-txt-secondary border-r-bg-primary flex items-center'>
     <QuantIcons
      name='minus'
      size='12'
     />
    </div>
    <input
     className={cn('border border-txt-secondary bg-bg-primary text-txt-primary w-14 h-14 min-h-4 text-center text-xl')}
     value={quantity}
     readOnly
     id='quantity'
     name='quantity'
     min='1'
    />
    <div
     onClick={handleIncrement}
     className='cursor-pointer px-4 border border-txt-secondary border-l-bg-primary flex items-center'>
     <QuantIcons
      name='plus'
      size='12'
     />
    </div>
   </div>
  </div>
 )
}

export default Quantity
