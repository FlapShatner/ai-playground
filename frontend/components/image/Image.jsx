import React from 'react'
import { cn } from '../utils'
import useIsSmall from '../hooks/useIsSmall'
import Grid from './Grid'
import Upscaled from './Upscaled'
import Progress from '../prompt/Progress'
import { useAtomValue } from 'jotai'
import { generatedAtom, captionAtom, isGeneratingAtom, isMakingVariantsAtom, isUpscalingAtom } from '../atoms'
import Generating from './Generating'
import Placeholder from './Placeholder'

function Image() {
  const generated = useAtomValue(generatedAtom)
  const caption = useAtomValue(captionAtom)
  const isGenerating = useAtomValue(isGeneratingAtom)
  const isMakingVariants = useAtomValue(isMakingVariantsAtom)
  const isUpscaling = useAtomValue(isUpscalingAtom)
  const isGenerated = generated?.url.length > 0

  const isSmall = useIsSmall()

  return (
    <div className='relative m-auto'>
      {isGenerating || isMakingVariants || isUpscaling ? (
        <Generating />
      ) : isGenerated ? (
        <div>
          <p className='text-center'>{caption}</p>
          <div className={cn('w-[95vh] flex flex-col overflow-hidden relative border border-border', isSmall && 'w-full')}>
            {generated.up ? <Upscaled /> : <Grid />}
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
