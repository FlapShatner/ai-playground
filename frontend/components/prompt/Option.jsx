import React, { useState } from 'react'
import { cn } from '../utils'
import Checkbox from './Checkbox'
import OptionSelect from './OptionSelect'
import { useAtom } from 'jotai'
import { shapeAtom, productTypeAtom, sizeLabelAtom } from '../atoms'

function Option({ product }) {
  const [productType, setProductType] = useAtom(productTypeAtom)
  const [sizeLabel, setSizeLabel] = useAtom(sizeLabelAtom)
  const [shape, setShape] = useAtom(shapeAtom)
  const productData = { id: product.id, label: product.label }

  const handleSelect = () => {
    setSizeLabel('')
    if (productData.id === productType.id) {
      setProductType({ id: '', label: '' })
      setShape({ id: '', label: '' })
      return
    }
    if (!product.isSelect) {
      setShape(product.options[0])
      setProductType(productData)
      return
    }
    setShape({ id: '', label: '' })
    setProductType(productData)
  }

  const isChecked = productData.id === productType.id

  const isWindow = product.id == 'wi'

  return (
    <div className={cn('flex items-center gap-2 py-1', product.isDisabled && 'opacity-45 pointer-events-none')}>
      <Checkbox onClick={handleSelect} isChecked={isChecked} />
      <div className='mr-auto flex flex-col justify-start'>
        <span className={cn(isWindow && 'text-sm')}>{product.label}</span>
        {product.isDisabled && <span className='text-xs'>Coming soon</span>}
        {product.isSelect && <OptionSelect handleSelect={handleSelect} isChecked={isChecked} product={product} />}
      </div>
    </div>
  )
}

export default Option