import React from 'react'
import Option from './Option'
import Step from './Step'
import { products } from '../options'

function Options() {
 return (
  <div>
   <Step step='1' />
   <span className='text-lg'>Choose a products</span>
   <div className='mt-2'>
    <div className='flex gap-4'>
     {products.map((arr) => (
      <div key={arr[0].id}>
       <div className='mt-2 flex flex-col gap-1'>
        {arr.map((product, i) => (
         <Option
          key={product.id}
          product={product}
         />
        ))}
       </div>
      </div>
     ))}
    </div>
   </div>
  </div>
 )
}

export default Options
