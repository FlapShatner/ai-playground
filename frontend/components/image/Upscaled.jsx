import React from 'react'
import Order from '../image/Order'
import { useAtomValue } from 'jotai'
import { generatedAtom } from '../atoms'
import { cld } from '../cloudinary'
import { AdvancedImage, placeholder } from '@cloudinary/react'

function Upscaled() {
  const generated = useAtomValue(generatedAtom)
  const image = cld.image(generated.publicId)
  image.quality('auto:best')
  return (
    <div className='aspect-square flex flex-col justify-between'>
      <div className='h-4 w-4 bg-transparent'></div>
      <a href={generated.url} target='_blank' rel='noopener noreferrer'>
        <AdvancedImage className='cursor-zoom-in' plugins={[placeholder({ mode: 'blur' })]} cldImg={image} />
      </a>
      <Order />
    </div>
  )
}

export default Upscaled
