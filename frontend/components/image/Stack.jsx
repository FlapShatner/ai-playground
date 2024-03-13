import React from 'react'
import { useEffect } from 'react'
import { cn } from '../utils'
import { cld } from '../cloudinary'
import { crop } from '@cloudinary/url-gen/actions/resize'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { useAtom, useAtomValue } from 'jotai'
import { stackArrayAtom, generatedAtom, detailModeAtom } from '../atoms'
import StackImage from './StackImage'
import Detail from './Detail'

function Stack() {
  const [stackArray, setStackArray] = useAtom(stackArrayAtom)
  const generated = useAtomValue(generatedAtom)
  const detailMode = useAtomValue(detailModeAtom)
  useEffect(() => {
    const arr = () => {
      const transformations = {
        topleft: 'north_west',
        topright: 'north_east',
        btmleft: 'south_west',
        btmright: 'south_east',
      }

      return Object.entries(transformations).map(([key, value], i) => {
        const image = cld.image(generated.publicId)
        image.resize(crop().width(0.5).height(0.5).gravity(compass(value)))
        return { id: i, label: key, image: image, shape: generated.shape }
      })
    }
    setStackArray(arr)
  }, [generated])
  return (
    <>
      {detailMode ? (
        <Detail />
      ) : (
        <>
          <div className={cn('flex flex-col gap-2 p-2 2xl:max-w-[1000px] max-w-[1800px]')}>
            {stackArray.map((img, i) => (
              <StackImage img={img} i={i} key={i} />
            ))}
          </div>
          <span className='text-center mb-1 text-accent'>Click to choose one of these images or enter a new prompt to try again</span>
        </>
      )}
    </>
  )
}

export default Stack
