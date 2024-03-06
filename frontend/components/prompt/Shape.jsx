import React, { useState } from 'react'
import { cn } from '../utils'
import { useWindowSize } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { shapeAtom } from '../atoms'
import { options } from '../shapeOptions'
import Chevron from '../icons/Chevron'
import Bigfoot from '../images/Bigfoot'
import Windshield from '../images/Windshield'
import Cat from '../images/Cat'

function Shape() {
  const [shape, setShape] = useAtom(shapeAtom)
  const { width } = useWindowSize()
  const isBreakpoint = width < 1100 && width > 1000

  return (
    <div className='w-full relative my-4'>
      <span className='flex justify-center'>Shape</span>

      <div className='flex flex-col gap-2  w-max z-20 m-auto'>
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
                'cursor-pointer bg-bg-secondary border border-border flex items-center gap-4 hover:border-accent hover:bg-bg-tertiary transition-transform ease-in-out pr-6 m-[3px]',
                isActive && 'border-accent border-4 bg-bg-tertiary m-0'
              )}>
              <div className=''>
                {item.id == 'contour' ? (
                  <Cat isActive={isActive} className={cn('w-28 mx-2 -my-2', isBreakpoint && 'w-16 -my-1')} />
                ) : (
                  <Windshield isActive={isActive} className={cn('w-28 m-2', isBreakpoint && 'w-16')} />
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
