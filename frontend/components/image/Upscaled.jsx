import React from 'react'
import Order from '../image/Order'
import { useAtom } from 'jotai'
import { generatedAtom } from '../atoms'
import { cld } from '../cloudinary'
import { AdvancedImage, placeholder } from '@cloudinary/react'

function Upscaled() {
  const [generated, setGenerated] = useAtom(generatedAtom)
  const image = cld.image(generated.publicId)
  image.quality('auto:best')
  return (
    <>
      <a href={generated.url} target='_blank' rel='noopener noreferrer'>
        <AdvancedImage className='cursor-zoom-in' plugins={[placeholder({ mode: 'blur' })]} cldImg={image} />
      </a>
      <Order />
    </>
  )
}

export default Upscaled
