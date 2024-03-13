import React, { useState } from 'react'
import { cn } from '../utils'
import { useWindowSize } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { shapeAtom } from '../atoms'
import { options } from '../shapeOptions'
import Star from '../images/Star'
import Windshield from '../images/Windshield'

function Shape() {
  const [shape, setShape] = useAtom(shapeAtom)
  const { width } = useWindowSize()
  const isBreakpoint = width < 1100 && width > 1000

  return (
    <div className='w-full relative my-4'>
      <span className='flex justify-center'>Shape</span>

      <div className='flex flex-col gap-2 max-w-[80vw]  z-20 m-auto'>
        {options.map((item, i) => {
          const handleClick = () => {
            setShape(item)
          }
          const isActive = shape.id === item.id
          return (
            <div
              key={item.id}
              onClick={handleClick}
              className={cn(
                'cursor-pointer bg-bg-secondary border border-border flex items-center gap-4 hover:border-accent hover:bg-bg-tertiary transition-transform ease-in-out my-1 max-w-[80vw] m-[3px] sm:pr-6 sm:max-w-full',
                isActive && 'border-accent border-4 bg-bg-tertiary m-0'
              )}>
              <div className=''>
                {item.id == 'contour' ? (
                  <div className={cn('ml-6 sm:mr-4 sm:ml-6 sm:w-28 ', isBreakpoint && 'w-12 ml-4 py-1')}>
                    <Star isActive={isActive} className={cn('w-12 my-2 sm:w-20 ', isBreakpoint && 'w-12')} />
                  </div>
                ) : (
                  <Windshield isActive={isActive} className={cn('w-20 sm:w-28 m-2', isBreakpoint && 'w-16')} />
                )}
              </div>
              <span className={cn('text-txt-primary text-lg ', isBreakpoint && 'text-sm', isActive && 'text-accent')}>{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Shape
