import React from 'react'
import Grid from './Grid'
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
      {generated ? (
        <div className={cn(isSmall && 'flex flex-col-reverse')}>
          <p className='text-center'>{caption}</p>
          <div className='h-[80vh]  aspect-square overflow-hidden relative border border-border'>
            <Grid />
          </div>
        </div>
      ) : (
        <div className='aspect-square overflow-hidden relative border border-border p-2 '>
          <img
            className=' opacity-10 absolute top-0 left-0'
            src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706821466/square-pholder_iwtdfz.png'
            alt='Placeholder image'
          />

          {/* <ol className='flex flex-col gap-2 p-4 sm:gap-6'>
            {isLoading ? (
              <span className='text-accent-bright text-2xl text-center'>Please wait while your new design is created!</span>
            ) : (
              <>
                {isFlex
                  ? largeListText.map((item, i) => (
                      <li className='grid grid-cols-12' key={i}>
                        <span className='text-accent-bright text-xl sm:text-xl md:text-lg col-span-1'>{i + 1} .</span>
                        <p className='text-accent-bright text-xl sm:text-xl md:text-lg col-span-11'>{item}</p>
                      </li>
                    ))
                  : listText.map((item, i) => (
                      <li className='grid grid-cols-12' key={i}>
                        <span className='text-accent-bright text-lg sm:text-xl md:text-lg col-span-1'>{i + 1} .</span>
                        <p className='text-accent-bright text-lg sm:text-xl md:text-lg col-span-11'>{item}</p>
                      </li>
                    ))}
              </>
            )}
          </ol> */}
        </div>
      )}
    </div>
  )
}

export default Image
