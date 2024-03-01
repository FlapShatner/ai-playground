import React, { useEffect, useState } from 'react'
// import { getQuadrants } from '../utils'
import GridImage from './GridImage'
import { cld } from '../cloudinary'
import { crop } from '@cloudinary/url-gen/actions/resize'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import Detail from './Detail'
import { useAtom } from 'jotai'
import { generatedAtom, imageArrayAtom, detailModeAtom, detailImageAtom } from '../atoms'

function Grid() {
  const [imageArray, setImageArray] = useAtom(imageArrayAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [detailMode, setDetailMode] = useAtom(detailModeAtom)
  if (!generated) {
    return <div>Loading...</div>
  }
  useEffect(() => {
    const arr = () => {
      // Define the transformations
      const transformations = {
        topleft: 'north_west',
        topright: 'north_east',
        btmleft: 'south_west',
        btmright: 'south_east',
      }

      return Object.entries(transformations).map(([key, value], i) => {
        const image = cld.image(generated.publicId)
        image.resize(crop().width(1024).height(1024).gravity(compass(value)))
        return { id: i, label: key, image: image }
      })
    }
    setImageArray(arr)
  }, [generated])

  return (
    <>
      {detailMode ? (
        <Detail />
      ) : (
        <div className='grid grid-cols-2 gap-2 p-2'>
          {imageArray.map((img, i) => (
            <GridImage img={img} i={i} key={i} />
          ))}
        </div>
      )}
    </>
  )
}

export default Grid
