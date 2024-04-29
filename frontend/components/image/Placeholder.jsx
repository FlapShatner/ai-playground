import React from 'react'
import { cn } from '../utils'
import useIsSmall from '../hooks/useIsSmall'

function Placeholder() {
 const isSmall = useIsSmall()
 return (
  <div className={cn('aspect-square overflow-hidden relative border border-border', isSmall && 'h-auto w-full')}>
   <img
    className={cn('opacity-10', isSmall && 'w-full')}
    src='https://res.cloudinary.com/dkxssdk96/image/upload/v1709067340/robotpaint_sfkx3t.png'
    alt='Placeholder image'
   />
  </div>
 )
}

export default Placeholder
