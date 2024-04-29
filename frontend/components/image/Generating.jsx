import React from 'react'
import { cn } from '../utils'
import SquaresLoad from '../loader/SquaresLoad'
import useIsSmall from '../hooks/useIsSmall'
import Progress from '../prompt/Progress'
import { useAtomValue } from 'jotai'
import { isMakingVariantsAtom, isGeneratingAtom } from '../atoms'

function Generating() {
 const isSmall = useIsSmall()
 const isGenerating = useAtomValue(isGeneratingAtom)
 const isMakingVariants = useAtomValue(isMakingVariantsAtom)
 return (
  <div
   className={cn('h-[80vh] max-w-[700px] 2xl:max-w-[1000px]  aspect-square overflow-hidden relative border border-border', isSmall && 'h-[80vw] sm:h-[80vh]')}>
   <img
    className=' opacity-10 max-w-[700px] 2xl:max-w-[1000px] h-[80vw] sm:h-full'
    src='https://res.cloudinary.com/dkxssdk96/image/upload/v1709067340/robotpaint_sfkx3t.png'
    alt='Placeholder image'
   />
   <div className='absolute top-0 left-0 w-full h-full bg-transparent'>
    <SquaresLoad />
    {isGenerating || isMakingVariants ? <Progress /> : null}
   </div>
  </div>
 )
}

export default Generating
