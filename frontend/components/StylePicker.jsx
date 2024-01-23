import React from 'react'
import { cn } from './utils'
import { prompts } from './prePrompt'

function StylePicker({ setImageStyle, imageStyle }) {
  return (
    <div className='flex flex-col'>
      <p className='mt-2 mb-3 mx-auto sm:w-max text-center border-b border-b-border text-txt-primary'>Choose an Image Style</p>
      <div className='flex flex-wrap gap-4 py-2'>
        {prompts.map((item, i) => {
          const handleCLick = () => {
            setImageStyle(item)
          }
          let isActive = imageStyle == item
          return (
            <div onClick={handleCLick} className={cn('cursor-pointer border border-border p-2', isActive && 'border-accent')}>
              <span className={cn('text-txt-primary', isActive && 'text-accent')}>{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StylePicker
