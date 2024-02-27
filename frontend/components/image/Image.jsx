import React from 'react'
import Grid from './Grid'
import Upscaled from './Upscaled'
import { cn } from '../utils'
import { useWindowSize } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { generatedAtom, captionAtom, isLoadingAtom } from '../atoms'

function Image() {
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [caption, setCaption] = useAtom(captionAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const { width } = useWindowSize()
  let isSmall = width < 640
  let isFlex = width > 768

  const listText = [
    'Describe your design in the box below',
    'Choose a style in the dropdown',
    'Click "Generate" to make your new design appear right here',
    'Choose a decal size and add your new design to your cart!',
  ]
  const largeListText = [
    'Describe your design in the box to the left',
    'Choose a style in the dropdown',
    'Click "Generate" to make your new design appear right here',
    'Choose a decal size and add your new design to your cart!',
  ]

  return (
    <div className=''>
      {generated?.url.length > 0 ? (
        <div className={cn(isSmall && 'flex flex-col-reverse')}>
          <p className='text-center'>{caption}</p>
          <div className='h-[95vh]  aspect-square overflow-hidden relative border border-border'>{generated.up ? <Upscaled /> : <Grid />}</div>
        </div>
      ) : (
        <div className='h-[80vh] aspect-square overflow-hidden relative border border-border '>
          <img className=' opacity-10' src='https://res.cloudinary.com/dkxssdk96/image/upload/v1709067340/robotpaint_sfkx3t.png' alt='Placeholder image' />
        </div>
      )}
    </div>
  )
}

export default Image
