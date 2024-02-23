import React, { useEffect, useState } from 'react'
import { getQuadrants } from '../utils'
import GridImage from './GridImage'

function Grid({ generated, isLoading }) {
  const [imageArray, setImageArray] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)
  if (!generated) {
    return <div>Loading...</div>
  }
  useEffect(() => {
    const arr = getQuadrants(generated)
    setImageArray(arr)
  }, [generated])

  return (
    <div className='grid grid-cols-2 gap-2 p-2'>
      {imageArray.map((img, i) => (
        <GridImage activeIndex={activeIndex} setActiveIndex={setActiveIndex} img={img} i={i} key={i} />
      ))}
    </div>
  )
}

export default Grid
