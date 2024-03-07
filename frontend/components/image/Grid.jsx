import React, { useEffect } from 'react'
import GridImage from './GridImage'
import { cld } from '../cloudinary'
import { crop } from '@cloudinary/url-gen/actions/resize'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import Detail from './Detail'
import { useAtom, useAtomValue } from 'jotai'
import { generatedAtom, imageArrayAtom, detailModeAtom } from '../atoms'

function Grid() {
  const [imageArray, setImageArray] = useAtom(imageArrayAtom)
  const generated = useAtomValue(generatedAtom)
  const detailMode = useAtomValue(detailModeAtom)
  if (!generated) {
    return <div>Loading...</div>
  }
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
        image.resize(crop().width(1024).height(1024).gravity(compass(value)))
        return { id: i, label: key, image: image, shape: generated.shape }
      })
    }
    setImageArray(arr)
  }, [generated])

  return (
    <>
      {detailMode ? (
        <Detail />
      ) : (
        <>
          <div className='grid grid-cols-2 gap-2 p-2 max-w-[700px] 2xl:max-w-[1000px]'>
            {imageArray.map((img, i) => (
              <GridImage img={img} i={i} key={i} />
            ))}
          </div>
          <span className='text-center mb-1 text-accent'>Click to choose one of these images or enter a new prompt to try again</span>
        </>
      )}
    </>
  )
}

export default Grid
