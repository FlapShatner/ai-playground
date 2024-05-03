import React from 'react'
import Order from '../image/Order'
import useIsSmall from '../hooks/useIsSmall'
import { cn } from '../utils'
import { useAtomValue } from 'jotai'
import { generatedAtom, isOrderingAtom } from '../atoms'
import { cld } from '../cloudinary'
import { AdvancedImage, placeholder } from '@cloudinary/react'

function Upscaled() {
 const generated = useAtomValue(generatedAtom)
 const isOrdering = useAtomValue(isOrderingAtom)
 const isSmall = useIsSmall()
 const image = cld.image(generated.publicId)
 image.quality('auto:best')
 return (
  <div className={cn('aspect-square flex flex-col justify-between', isOrdering && 'justify-center', isSmall && 'aspect-auto')}>
   <div className={cn('h-4 w-4 bg-transparent', isOrdering && 'hidden')}></div>
   <a
    href={generated.url}
    target='_blank'
    rel='noopener noreferrer'>
    <AdvancedImage
     className='cursor-zoom-in object-contain sm:w-full max-w-[90vw] m-auto'
     plugins={[placeholder({ mode: 'blur' })]}
     cldImg={image}
    />
   </a>
   <Order />
  </div>
 )
}

export default Upscaled
