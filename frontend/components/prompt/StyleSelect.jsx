import React, { useState, useRef } from 'react'
import { prompts } from '../prePrompt'

import Step from './Step'
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

    return (
        <div
            ref={wrapRef}
            className='relative grid sm:mt-0 '>
            <Step
                step='3'
                title='Choose a style'
                desc='Choose from a variety of styles to get the look you want'
            />
            <div className='w-full mt-2 m-auto '>
                <div
                    onClick={handleClick}
                    className='cursor-pointer border border-border rounded-md flex items-center justify-between gap-2 w-full bg-bg-secondary'>
                    <div className='flex items-center w-full gap-2'>
                        <img
                            className='w-16 rounded-md'
                            src={imageStyle.img}
                            alt={imageStyle.img}
                        />
                        <div className='w-full flex '>
                            <span className='text-xl text-accent'>{imageStyle.label}</span>
                        </div>
                    </div>
                    <Chevron
                        className='ml-auto mr-1 h-16 sm:h-auto flex flex-col items-center'
                        direction='down'
                    />
                </div>
                {isOpen && (
                    <div className='absolute bg-bg-secondary w-full h-64 overflow-y-scroll border-b border-border z-20'>
                        {prompts.map((item, i) => {
                            const handleClick = () => {
                                setImageStyle(item)
                                setIsOpen(false)
                            }

                            let isActive = imageStyle == item
                            return (
                                <div
                                    key={item.id}
                                    onClick={handleClick}
                                    onMouseEnter={() => setIsHover(item.id)}
                                    onMouseLeave={() => setIsHover(null)}
                                    className={cn(
                                        'cursor-pointer border border-border flex items-center gap-4 hover:border-accent hover:bg-bg-tertiary transition-transform ease-in-out ',
                                        isActive && 'hidden'
                                        // isHover == item.id && 'scale-[102%]'
                                    )}>
                                    <div className='h-[67px]'>
                                        <img
                                            className={cn('border-l w-16 ')}
                                            src={item.img}
                                            alt={item.label}
                                        />
                                    </div>
                                    <span className={cn('text-txt-primary text-xl  ', isActive && 'text-accent')}>{item.label}</span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default StyleSelect
