import React from 'react'
import { cn } from './utils'
import LongLeft from './icons/LongLeft'
import { useWindowSize } from 'usehooks-ts'

function Image({ generated, caption, isLoading }) {
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
    <div className='sm:w-2/3  md:1/3'>
      {generated ? (
        <div className={cn(isSmall && 'flex flex-col-reverse')}>
          <p className='text-center'>{caption}</p>
          <img src={generated} alt='' />
        </div>
      ) : (
        <div className='aspect-square overflow-hidden relative border border-border p-4 '>
          <img
            className=' opacity-10 absolute top-0 left-0'
            src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706821466/square-pholder_iwtdfz.png'
            alt='Placeholder image'
          />

          <ol className='flex flex-col gap-2 p-4 sm:gap-6'>
            {isLoading ? (
              <span className='text-accent-bright text-xl text-center'>Please wait while your new design is created!</span>
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
          </ol>
        </div>
      )}
    </div>
  )
}

export default Image
