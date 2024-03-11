import React from 'react'
import { cn } from '../utils'
import useIsSmall from '../hooks/useIsSmall'
import Grid from './Grid'
import Upscaled from './Upscaled'
import Progress from '../prompt/Progress'
import { useAtomValue, useAtom } from 'jotai'
import { generatedAtom, captionAtom, isGeneratingAtom, isMakingVariantsAtom, isUpscalingAtom, shapeAtom, isWideAtom } from '../atoms'
import Generating from './Generating'
import Placeholder from './Placeholder'
import Stack from './Stack'
import { useState } from 'react'

function Image() {
  const [isWide, setIsWide] = useAtom(isWideAtom)
  const shape = useAtomValue(shapeAtom)
  const generated = useAtomValue(generatedAtom)
  const caption = useAtomValue(captionAtom)
  const isGenerating = useAtomValue(isGeneratingAtom)
  const isMakingVariants = useAtomValue(isMakingVariantsAtom)
  const isUpscaling = useAtomValue(isUpscalingAtom)
  const isGenerated = generated?.url.length > 0

  const isSmall = useIsSmall()
  // const isSquare = true
  const isSquare = generated?.shape?.grid ? true : false

  return (
    <div className='relative m-auto'>
      {isGenerating || isMakingVariants || isUpscaling ? (
        <Generating />
      ) : isGenerated ? (
        <div>
          <p className='text-center'>{caption}</p>
          <div className={cn('w-[95vh] max-w-[700px] 2xl:max-w-[1000px] flex flex-col overflow-hidden relative border border-border', isSmall && 'w-full')}>
            {generated.up ? <Upscaled /> : <>{isSquare ? <Grid /> : <Stack />} </>}
          </div>
        </div>
      ) : (
        <Placeholder />
      )}
      {(isGenerating || isMakingVariants) && <Progress />}
    </div>
  )
}

export default Image
