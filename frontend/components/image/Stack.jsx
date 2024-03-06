import React from 'react'
import { useEffect } from 'react'
import { cld } from '../cloudinary'
import { crop } from '@cloudinary/url-gen/actions/resize'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { useAtom } from 'jotai'
import { stackArrayAtom } from '../atoms'
import StackImage from './StackImage'

function Stack() {
  const [stackArray, setStackArray] = useAtom(stackArrayAtom)
  const imgId = 'dragon_vmu60y'
  useEffect(() => {
    const arr = () => {
      const transformations = {
        topleft: 'north_west',
        topright: 'north_east',
        btmleft: 'south_west',
        btmright: 'south_east',
      }

      return Object.entries(transformations).map(([key, value], i) => {
        const image = cld.image(imgId)
        image.resize(crop().width(0.5).height(0.5).gravity(compass(value)))
        return { id: i, label: key, image: image }
      })
    }
    setStackArray(arr)
  }, [])
  return (
    <>
      <div className='flex flex-col gap-2 p-2 max-w-[700px] 2xl:max-w-[1000px]'>
        {stackArray.map((img, i) => (
          <StackImage img={img} i={i} key={i} />
        ))}
      </div>
      <span className='text-center mb-1 text-accent'>Click to choose one of these images or enter a new prompt to try again</span>
    </>
  )
}

export default Stack
