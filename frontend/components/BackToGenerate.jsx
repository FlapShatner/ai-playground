import React from 'react'
import { cn } from './utils'
import useClearGenerated from './hooks/useClearGenerated'
import useIsSmall from './hooks/useIsSmall'

function BackToGenerate() {
 const isSmall = useIsSmall()
 const clearGenerated = useClearGenerated()

 return (
  <div className={cn('flex flex-col justify-center w-4/5', isSmall && 'w-full max-w-[700px] m-auto')}>
   <div
    onClick={clearGenerated}
    className='border-2 border-accent py-12 rounded-md bg-bg-secondary text-center font-bold text-2xl cursor-pointer w-4/5 m-auto'>
    Start a new design
   </div>
  </div>
 )
}

export default BackToGenerate
