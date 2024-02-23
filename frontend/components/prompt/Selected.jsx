import React from 'react'
import { cn } from '../utils'

function Option({ children, onClick, className }) {
  return (
    <div onClick={onClick} className={cn('cursor-pointer border border-accent p-6 text-center', className)}>
      {children}
    </div>
  )
}

function Selected({ onVariations, onUpscale }) {
  return (
    <div className='flex gap-4'>
      <Option onClick={onVariations}>Make Variations From Selected Image</Option>
      <Option onClick={onUpscale}>Upscale Selected Image</Option>
    </div>
  )
}

export default Selected
