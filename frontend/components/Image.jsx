import React from 'react'
import LongLeft from './icons/LongLeft'

function Image({ generated, caption }) {
  return (
    <div className=' '>
      {generated ? (
        <div>
          <p className='text-center'>{caption}</p>
          <img src={generated} alt='' />
        </div>
      ) : (
        <div className='aspect-square overflow-hidden relative border border-border p-4 '>
          <img
            className=' opacity-20 absolute top-0 left-0'
            src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706821466/square-pholder_iwtdfz.png'
            alt='Placeholder image'
          />
          <p className='lg:mt-12 flex gap-2 items-center text-2xl text-accent-bright'>
            <LongLeft size='24' color='#FCC000' /> Describe your design in this box
          </p>
          <p className='mt-28 flex gap-2 items-center text-2xl text-accent-bright'>
            <LongLeft size='24' color='#FCC000' /> Choose a style
          </p>
          <p className='max-[700px]:hidden mt-16 lg:mt-20 sm:flex gap-2 items-center text-2xl text-accent-bright'>
            <LongLeft size='24' color='#FCC000' />
            Click here to generate a one-of-a-kind image
          </p>
        </div>
      )}
    </div>
  )
}

export default Image
