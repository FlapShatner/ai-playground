import React from 'react'
import { cn } from './utils'
import { prompts } from './prePrompt'

function StylePicker({ setImageStyle, imageStyle }) {
  return (
    <div className='flex flex-col'>
      <p className='mt-2 mb-3 mx-auto sm:w-max text-center border-b border-b-border text-txt-primary'>Choose an Image Style</p>
      <div className='grid grid-cols-3 gap-4 py-2'>
        {prompts.map((item, i) => {
          const handleClick = () => {
            setImageStyle(item)
          }
          let isActive = imageStyle == item
          return (
            <div
              key={item.id}
              onClick={handleClick}
              className={cn('cursor-pointer border border-border p-2 py-1 flex items-center gap-2', isActive && 'border-accent')}>
              <img className='w-12' src={item.img} alt={item.label} />
              <span className={cn('text-txt-primary text-sm', isActive && 'text-accent')}>{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StylePicker
