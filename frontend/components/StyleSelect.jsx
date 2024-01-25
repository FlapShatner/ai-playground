import React, { useState, useRef } from 'react'
import { prompts } from './prePrompt'
import { cn } from './utils'
import Chevron from './Chevron'

function StyleSelect({ setImageStyle, imageStyle }) {
  const wrapRef = useRef(null)
  const [isHover, setIsHover] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 400)

  return (
    <div ref={wrapRef} className='mt-4 grid'>
      <span className='m-auto'>Choose a style</span>
      <div className='w-72 m-auto'>
        <div onClick={handleClick} className='cursor-pointer border border-border flex items-center justify-between gap-2 w-full bg-bg-secondary'>
          <div className='flex items-center gap-4'>
            <img className='w-16' src={imageStyle.img} alt={imageStyle.img} />
            <span className='text-xl text-accent'>{imageStyle.label}</span>
          </div>
          <Chevron className='ml-auto h-16 flex flex-col items-center' direction='down' />
        </div>

        {isOpen &&
          prompts.map((item, i) => {
            const handleClick = () => {
              setImageStyle(item)
              setIsOpen(false)
              scrollToRef(wrapRef)
            }

            let isActive = imageStyle == item
            return (
              <div
                key={item.id}
                onClick={handleClick}
                onMouseEnter={() => setIsHover(item.id)}
                onMouseLeave={() => setIsHover(null)}
                className={cn(
                  'cursor-pointer border border-border flex items-center gap-4 hover:border-accent hover:bg-bg-secondary transition-transform ease-in-out',
                  isActive && 'hidden',
                  isHover == item.id && 'scale-110'
                )}>
                <img className={cn(' w-16 ')} src={item.img} alt={item.label} />
                <span className={cn('text-txt-primary text-xl', isActive && 'text-accent')}>{item.label}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default StyleSelect
