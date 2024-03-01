import React from 'react'
import { useAtom } from 'jotai'
import { detailImageAtom, detailModeAtom, isMakingVariantsAtom, isUpscalingAtom } from '../atoms'
import CloseIcon from '../icons/CloseIcon'
import Selected from '../prompt/Selected'
import LeftArrow from '../icons/leftArrow'
import SquaresLoad from '../loader/SquaresLoad'
import { AdvancedImage, placeholder } from '@cloudinary/react'

function Detail() {
  const [detailMode, setDetailMode] = useAtom(detailModeAtom)
  const [detailImage, setDetailImage] = useAtom(detailImageAtom)
  const [isMakingVariants, setIsMakingVariants] = useAtom(isMakingVariantsAtom)
  const [isUpscaling, setIsUpscaling] = useAtom(isUpscalingAtom)
  return (
    <div>
      <div onClick={() => setDetailMode(false)} className='flex cursor-pointer items-center hover:text-accent-bright'>
        <LeftArrow className='m-2 cursor-pointer w-8 h-8 text-accent ' />
        <span className='text-lg font-semibold text-accent underline '>Back to grid</span>
      </div>
      <div className='relative'>
        <AdvancedImage className='w-[80%] m-auto' plugins={[placeholder({ mode: 'blur' })]} cldImg={detailImage.image} />
      </div>
      <Selected />
      {(isMakingVariants || isUpscaling) && (
        <div className='absolute top-0 left-0 w-full h-full bg-backdrop-dark'>
          <SquaresLoad />
        </div>
      )}
    </div>
  )
}

export default Detail
