import React from 'react'
import { cn } from './utils'

function Order() {
  return (
    <div
      className={cn(
        'flex flex-col cursor-pointer border border-accent p-4 text-center text-bg-secondary font-semibold m-4 bg-accent hover:bg-accent-bright rounded-md'
      )}>
      <span className='text-xl'>Buy as a decal!</span>
      <span className='text-sm font-semibold'>Click for prices and details</span>
    </div>
  )
}

export default Order
