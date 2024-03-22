import React from 'react'

function SuggFallback() {
  return (
    <div className='cursor-pointer min-w-36 max-w-[200px] p-2 flex flex-col'>
    <div className='min-w-36 min-h-36 flex justify-center items-center border border-accent'>Loading...</div>
    <p className='text-accent text-xs mt-2 opacity-0'>Title</p>
        <p className='text-accent text-xs font-bold opacity-0'>from $0.00</p>
        <p className='flex items-center gap-1 text-xs text-accent opacity-0'>
          <span className='w-[7px] h-[7px] bg-accent rounded-full opacity-0' />
          In Stock
        </p>
    </div>
  )
}

export default SuggFallback
