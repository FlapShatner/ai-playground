import React from 'react'
import { cn } from '../utils'
import { AdvancedImage, placeholder } from '@cloudinary/react'

function StackImage({ img, i }) {
  return (
    <div key={i} className={cn('overflow-hidden hover:border-2 hover:border-accent hover:-m-[2px]')}>
      <AdvancedImage plugins={[placeholder({ mode: 'blur' })]} className='cursor-pointer object-cover w-full h-full ' cldImg={img.image} />
    </div>
  )
}

export default StackImage
