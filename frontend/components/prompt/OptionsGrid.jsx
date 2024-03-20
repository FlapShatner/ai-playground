import React from 'react'
import Option from './Option'
import Step from './Step'
import { useAtom } from 'jotai'
import { productTypeAtom } from '../atoms'
import { products } from '../options'

function OptionsGrid() {
 const options = products[0].concat(products[1])
 return (
  <div>
   <Step
    step='1'
    title='Choose a product'
   />

   <div className='mt-2'>
    <div className='grid grid-cols-2 gap-2'>
     {options.map((product) => (
      <Option
       key={product.id}
       product={product}
      />
     ))}
    </div>
   </div>
  </div>
 )
}

export default OptionsGrid
