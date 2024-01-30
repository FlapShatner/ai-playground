import React, { useState, useEffect } from 'react'
import { formatPrice } from './utils'

function SingleSuggestion({ s }) {
  //   const price = formatPrice(s.price)
  return (
    <div className='cursor-pointer min-w-36 max-w-[200px] p-2 flex flex-col'>
      <a target='_blank' rel='noopener noreferrer' href={s.url}>
        <div>
          <img src={s.image} />
        </div>
        <p className='text-accent text-xs mt-2'>{s.title}</p>
        <p className='text-accent text-xs font-bold'>from ${s.price}</p>
        <p className='flex items-center gap-1 text-xs text-accent opacity-60'>
          <span className='w-[7px] h-[7px] bg-accent rounded-full ' />
          In Stock
        </p>
      </a>
    </div>
  )
}

export default SingleSuggestion
