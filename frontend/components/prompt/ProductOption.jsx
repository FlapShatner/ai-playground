import React from 'react'
import { cn } from '../utils'
import OptionSelect from './OptionSelect'
import { useAtom, useSetAtom } from 'jotai'
import { shapeAtom, productTypeAtom, sizeLabelAtom, generatedAtom } from '../atoms'

function ProductOption({ product }) {
    const [productType, setProductType] = useAtom(productTypeAtom)
    const setGenerated = useSetAtom(generatedAtom)
    const setSizeLabel = useSetAtom(sizeLabelAtom)
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
    const is3D = product.id == '3d'

    return (

        <div
            onClick={handleSelect}
            className={cn(
                'flex items-center gap-2 py-1 border border-txt-secondary px-2 cursor-pointer bg-bg-secondary hover:bg-bg-primary transition-all duration-200 ease-in-out',
                product.isDisabled && 'opacity-45 pointer-events-none',
                isChecked && 'border-accent bg-accent-tr hover:bg-accent-tr',
                is3D && 'rounded-b-md'
            )}>
            <div className='mr-auto flex flex-col justify-start rounded-b-md'>
                <span className={cn(isWindow && 'text-sm')}>{product.label}</span>
                {product.isDisabled && <span className='text-xs'>Coming soon</span>}
                {product.isSelect && isChecked && (
                    <OptionSelect
                        handleSelect={handleSelect}
                        isChecked={isChecked}
                        product={product}
                    />
                )}
            </div>

        </div>
    )
}

export default ProductOption
