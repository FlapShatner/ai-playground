import React, { useState, useRef } from 'react'
import { prompts } from '../prePrompt'
import { cn } from '../utils'
import Chevron from '../icons/Chevron'
import { useAtom } from 'jotai'
import { imageStyleAtom } from '../atoms'

function StyleSelect() {
  const [imageStyle, setImageStyle] = useAtom(imageStyleAtom)
  const wrapRef = useRef(null)
  const [isHover, setIsHover] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 400)

  return (
    <div ref={wrapRef} className='mt-4 grid sm:mt-0'>
      <span className='m-auto'>Choose a style</span>
      <div className='w-full lg:w-3/4 m-auto'>
        <div onClick={handleClick} className='cursor-pointer border border-border flex items-center justify-between gap-2 w-full bg-bg-secondary'>
          <div className='flex items-center w-full'>
            <img className='w-16' src={imageStyle.img} alt={imageStyle.img} />
            <div className='w-full flex justify-center'>
              <span className='text-xl text-accent'>{imageStyle.label}</span>
            </div>
          </div>
          <Chevron className='ml-auto mr-1 h-16 sm:h-auto flex flex-col items-center' direction='down' />
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
                  'cursor-pointer border border-border flex items-center gap-4 hover:border-accent hover:bg-bg-secondary transition-transform ease-in-out ',
                  isActive && 'hidden',
                  isHover == item.id && 'scale-110'
                )}>
                <div className='h-[67px]'>
                  <img className={cn(' w-16 ')} src={item.img} alt={item.label} />
                </div>
                <span className={cn('text-txt-primary text-xl', isActive && 'text-accent')}>{item.label}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default StyleSelect
