import React from 'react'
import Option from './Option'
import { products } from '../options'

function Options() {
  return (
    <div>
      <span className='text-lg'>Choose a product</span>
      <div className='mt-2 grid grid-cols-1 gap-2'>
        {products.map((product, i) => (
          <Option product={product} />
        ))}
      </div>
    </div>
  )
}

export default Options
