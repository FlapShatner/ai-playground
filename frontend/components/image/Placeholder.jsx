import React from 'react'
import { cn } from '../utils'
import useIsSmall from '../hooks/useIsSmall'

function Placeholder() {
    const isSmall = useIsSmall()
    return (
        <div className={cn('w-[85vh] max-w-[700px] 2xl:max-w-[1000px] aspect-square overflow-hidden relative border border-border', isSmall && 'h-auto w-full')}>
            <img
                className={cn('w-[85vh] max-w-[700px] 2xl:max-w-[1000px] opacity-10', isSmall && 'w-full')}
                src='https://res.cloudinary.com/dkxssdk96/image/upload/v1709067340/robotpaint_sfkx3t.png'
                alt='Placeholder image'
            />
        </div>
    )
}

export default Placeholder
