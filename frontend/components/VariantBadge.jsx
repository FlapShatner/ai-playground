import React from 'react'
import { cn } from './utils'

export default function VariantBadge({ variant, size, setSize, setProductPrice }) {
  const isSelected = variant.id === size
  const handleChange = (e) => {
    setSize(variant.id)
    setProductPrice(variant.price)
  }
  return (
    <div
      className={cn('relative border cursor-pointer bg-bg-secondary border-bg-primary py-3', isSelected ? 'bg-bg-primary border-txt-secondary' : '')}
      key={variant.id}>
      <input className='hidden' id={variant.id} name={variant.id} type='radio' checked={isSelected} onChange={handleChange} />
      <label className='cursor-pointer inline text-base p-3' htmlFor={variant.id}>
        {variant.title}
      </label>
    </div>
  )
}
