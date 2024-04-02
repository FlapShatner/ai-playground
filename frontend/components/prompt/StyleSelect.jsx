import React, { useState, useRef } from 'react'
import { prompts } from '../prePrompt'
import { CSSTransition } from 'react-transition-group';
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

    const nodeRef = useRef(null)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div
            ref={wrapRef}
            className='relative grid sm:mt-0 '>
            <Step
                step='2'
                title='Choose a style'
                desc='Choose from a variety of styles to get the look you want'
            />
            <div className='w-full mt-2 m-auto '>
                <div
                    onClick={handleClick}
                    className={cn('cursor-pointer border border-border rounded-md flex items-center justify-between gap-2 w-full bg-accent-tr', isOpen && 'rounded-b-none')}>
                    <div className='flex items-center w-full gap-2'>
                        <img
                            className='w-16 rounded-md'
                            src={imageStyle.img}
                            alt={imageStyle.label}
                        />
                        <div className='w-full flex '>
                            <span className='text-xl '>{imageStyle.label}</span>
                        </div>
                    </div>
                    <Chevron
                        className='ml-auto mr-1 h-16 sm:h-auto flex flex-col items-center'
                        direction='down'
                    />
                </div>
                {isOpen && (
                    <div className='absolute bg-bg-secondary w-full border-b border-border z-20'>
                        {prompts.map((item, i) => {
                            const handleClick = () => {
                                setImageStyle(item)
                                setIsOpen(false)
                            }
                            const isLast = i === prompts.length - 1
                            let isActive = imageStyle == item
                            return (
                                <div
                                    key={item.id}
                                    onClick={handleClick}
                                    onMouseEnter={() => setIsHover(item.id)}
                                    onMouseLeave={() => setIsHover(null)}
                                    className={cn(
                                        'cursor-pointer border border-border flex items-center gap-4 hover:border-accent hover:bg-bg-primary transition-transform ease-in-out', isLast && 'rounded-b-md', isActive && 'border-accent bg-accent-tr',
                                        isActive && 'hidden'
                                        // isHover == item.id && 'scale-[102%]'
                                    )}>
                                    <div className='h-[67px]'>
                                        <img
                                            className={cn('border-l w-16 rounded-r-md ')}
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
