import React from 'react'
import { cn } from './utils'

function Chevron({ direction, className }) {
  return (
    <div className={cn('flex justify-center opacity-80  w-12 sm:w-20 bg-bg-secondary cursor-pointer', direction == 'down' ? 'bottom-0' : 'top-0', className)}>
      {direction == 'down' ? (
        <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 16 16'>
          <path
            fill='#A6A6A6'
            fill-rule='evenodd'
            d='M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67'
          />
        </svg>
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 16 16'>
          <path fill='#A6A6A6' fill-rule='evenodd' d='M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56L2.224 9.447a.5.5 0 1 1-.448-.894z' />
        </svg>
      )}
    </div>
  )
}

export default Chevron
