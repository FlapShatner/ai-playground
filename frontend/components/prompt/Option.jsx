import React from 'react'
import Checkbox from './Checkbox'

function Option({ product }) {
  return (
    <div className='flex items-center gap-2 p-2 border border-border'>
      <Checkbox />
      <span>{product.label}</span>
    </div>
  )
}

export default Option
