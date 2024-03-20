import React from 'react'
import Option from './Option'
import Step from './Step'
import Help from '../icons/Help'
import OptionsGuide from '../info/OptionsGuide'
import { useAtom } from 'jotai'
import { productTypeAtom } from '../atoms'
import { products } from '../options'

function OptionsGrid() {
 const options = products[0].concat(products[1])
 return (
  <div className='mb-2'>
   <div className='flex justify-between'>
    <Step
     step='1'
     title='Choose a product'
     desc="You've got options! We'll print your new design in any of these formats"
    />
    <Help
     size='24px'
     color='#d2ac53'
     className='cursor-pointer min-w-6'
     id='optionsGuide'
    />
    <OptionsGuide />
   </div>

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
