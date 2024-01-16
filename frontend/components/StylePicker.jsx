import React from 'react'
import { cn } from './utils'

function StylePicker({ imageStyle, setImageStyle }) {
  const options = [
    {
      id: 'vivid',
      name: 'Vivid',
    },
    {
      id: 'natural',
      name: 'Natural',
    },
  ]

  const handleClick = (e) => {
    setImageStyle(e.target.id)
  }

  return (
    <div className='flex gap-4'>
      {options.map((option) => (
        <div
          onClick={handleClick}
          key={option.id}
          id={option.id}
          className={cn('px-2 py-1 border border-border cursor-pointer text-txt-primary', imageStyle === option.id && 'bg-black border-accent text-accent')}>
          {option.name}
        </div>
      ))}
    </div>
  )
}

export default StylePicker
