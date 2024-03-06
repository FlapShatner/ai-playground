import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { getCurrentProduct, formatPrice, cn } from '../utils'
import CloseIcon from '../icons/CloseIcon'
import { useOnClickOutside } from 'usehooks-ts'
import useIsSmall from '../hooks/useIsSmall'
import VariantSelect from '../form/VariantSelect'
import Quantity from '../form/Quantity'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { sizeAtom, quantityAtom, isSuccessAtom, addingToCartAtom, generatedAtom, notesAtom, productAtom, isOrderingAtom } from '../atoms'

function Form({ addVariantToCart }) {
  const [product, setProduct] = useAtom(productAtom)
  const [size, setSize] = useAtom(sizeAtom)
  const [quantity, setQuantity] = useAtom(quantityAtom)
  const [notes, setNotes] = useAtom(notesAtom)
  const [productPrice, setProductPrice] = useState('')
  const [disclaimer, setDisclaimer] = useState(false)
  const isAddingToCart = useAtomValue(addingToCartAtom)
  const isSuccess = useAtomValue(isSuccessAtom)
  const setIsOrdering = useSetAtom(isOrderingAtom)
  const clickRef = useRef()
  useOnClickOutside(clickRef, () => setDisclaimer(false))
  const isSmall = useIsSmall()

  useEffect(() => {
    const fetchProduct = async () => {
      const currentProduct = await getCurrentProduct()
      setProduct(currentProduct)
      setProductPrice(currentProduct.price)
    }
    fetchProduct()
  }, [])

  const onCancel = () => {
    setQuantity(0)
    setIsOrdering(false)
  }

  if (!product) return <h1>Loading...</h1>

  const variants = product.variants

  const price = formatPrice(productPrice, quantity)

  return (
    <div className='flex w-full'>
      <div className={cn('w-full flex flex-col justify-end gap-4 text-txt-primary pl-0', isSmall && 'max-w-[700px] m-auto')}>
        <span className={cn('text-4xl font-black text-end', isSmall && 'text-4xl')}>{price}</span>

        <div className={cn('flex flex-col items-end gap-4 ml-auto', isSmall && 'flex-row')}>
          <VariantSelect size={size} setSize={setSize} variants={variants} setProductPrice={setProductPrice} />
          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </div>

        <div className='relative'>
          <p onClick={() => setDisclaimer(!disclaimer)} className='text-lg cursor-pointer underline text-end'>
            Disclaimer*
          </p>
          {disclaimer && (
            <div ref={clickRef} className='p-3 pt-4 absolute z-40 w-80 right-2 bg-bg-secondary border border-border'>
              <CloseIcon className='ml-auto absolute right-4 top-2 cursor-pointer' onClick={() => setDisclaimer(false)} />
              <p>
                Please be aware that objects in the background may be removed and images with complex outlines may be simplified for optimal printing quality.
              </p>
            </div>
          )}
          <div className='mt-4'>
            <label className='text-sm' htmlFor='notes'>
              Special instructions:
            </label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              type='text'
              className={cn('h-8', isSmall && 'bg-transparent border border-border')}
              name='notes'
              id='notes'
            />
          </div>
        </div>
        {isSuccess && <p className='text-accent text-4xl'>Item added to cart</p>}
        <div className='flex justify-center w-full gap-4'>
          <div
            className={cn(
              'bg-bg-secondary cursor-pointer text-accent border border-accent text-xl font-semibold rounded-md p-4 py-6 min-w-max disabled:opacity-20 disabled:cursor-not-allowed'
            )}
            onClick={onCancel}>
            Cancel
          </div>
          <button
            disabled={size === '' || quantity === 0}
            className={cn(
              'bg-accent cursor-pointer w-full text-black text-xl font-semibold rounded-md p-4 py-6 disabled:opacity-20 disabled:cursor-not-allowed'
            )}
            onClick={addVariantToCart}>
            {isAddingToCart ? 'Adding to card...' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form
