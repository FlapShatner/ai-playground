import React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { detailImageAtom, detailModeAtom, isMakingVariantsAtom, isUpscalingAtom } from '../atoms'
import { cn } from '../utils'
import Selected from '../prompt/Selected'
import LeftArrow from '../icons/leftArrow'
import Order from '../image/Order'
import SquaresLoad from '../loader/SquaresLoad'
import { AdvancedImage, placeholder } from '@cloudinary/react'

function Detail() {
  const setDetailMode = useSetAtom(detailModeAtom)
  const detailImage = useAtomValue(detailImageAtom)
  const isMakingVariants = useAtomValue(isMakingVariantsAtom)
  const isUpscaling = useAtomValue(isUpscalingAtom)
  const isWindow = detailImage?.shape?.id == 'window'
  return (
    <div className='aspect-square flex flex-col justify-center'>
      <div onClick={() => setDetailMode(false)} className='flex cursor-pointer items-center hover:text-accent-bright'>
        <LeftArrow className=' m-2 cursor-pointer w-8 h-8 text-accent ' />
        <span className='text-lg font-semibold text-accent underline '>Back to grid</span>
      </div>
      <AdvancedImage className={cn('w-2/3 m-auto', isWindow && 'w-full')} plugins={[placeholder({ mode: 'blur' })]} cldImg={detailImage.image} />
      <Selected />
      <Order />
      {(isMakingVariants || isUpscaling) && (
        <div className='absolute top-0 left-0 w-full h-full bg-backdrop-dark'>
          <SquaresLoad />
        </div>
      )}
    </div>
  )
}

export default Detail
