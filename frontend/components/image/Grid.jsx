import React, { useEffect, useState } from 'react'
import { getQuadrants } from '../utils'
import GridImage from './GridImage'
import { useAtom } from 'jotai'
import { generatedAtom, imageArrayAtom } from '../atoms'

function Grid() {
  const [imageArray, setImageArray] = useAtom(imageArrayAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  if (!generated) {
    return <div>Loading...</div>
  }
  useEffect(() => {
    const arr = getQuadrants(generated.url)
    setImageArray(arr)
  }, [generated])

  return (
    <div className='grid grid-cols-2 gap-2 p-2'>
      {imageArray.map((img, i) => (
        <GridImage img={img} i={i} key={i} />
      ))}
    </div>
  )
}

export default Grid
