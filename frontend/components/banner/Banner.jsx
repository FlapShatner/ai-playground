import React from 'react'
import Pointer from './Pointer'

function Banner() {
  return (
    <div className='bg-accent border border-accent h-[84px] items-end flex justify-center gap-6 sm:gap-10 pb-2 px-4 text-center'>
      <Pointer />
      <p className='text-lg sm:text-2xl h-full text-bg-secondary font-bold flex items-center'>Try our new AI design playground!</p>
      <Pointer />
    </div>
  )
}

export default Banner
