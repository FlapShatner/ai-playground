import React from 'react'
import { cn } from '../utils'
import SquaresLoad from '../loader/SquaresLoad'
import useIsSmall from '../hooks/useIsSmall'

function Generating() {
  const isSmall = useIsSmall()
  return (
    <div className={cn('h-[95vh] aspect-square overflow-hidden relative border border-border', isSmall && 'h-[80vh]')}>
      <img className=' opacity-10' src='https://res.cloudinary.com/dkxssdk96/image/upload/v1709067340/robotpaint_sfkx3t.png' alt='Placeholder image' />

      <div className='absolute top-0 left-0 w-full h-full bg-transparent'>
        <SquaresLoad />
      </div>
    </div>
  )
}

export default Generating
