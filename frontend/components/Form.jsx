import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { getCurrentProduct, formatPrice, cn, generate } from './utils'
import CloseIcon from './icons/CloseIcon'
import { useWindowSize, useOnClickOutside } from 'usehooks-ts'
import VariantSelect from './VariantSelect'
import Quantity from './Quantity'

function Form({ addVariantToCart, size, setSize, quantity, setQuantity, enabled, isSuccess, loading, generated }) {
  const [product, setProduct] = useState(null)
  const [productPrice, setProductPrice] = useState('')
  const [disclaimer, setDisclaimer] = useState(false)
  const clickRef = useRef()
  useOnClickOutside(clickRef, () => setDisclaimer(false))
  const { width } = useWindowSize()
  let isSmall = width < 640

  useEffect(() => {
    const fetchProduct = async () => {
      const currentProduct = await getCurrentProduct()
      setProduct(currentProduct)
      setProductPrice(currentProduct.price)
    }
    fetchProduct()
  }, [])

  if (!product) return <h1>Loading...</h1>

  const variants = product.variants

  const price = formatPrice(productPrice, quantity)

  return (
    <>
      <div className={cn('w-1/3 flex flex-col gap-4 text-txt-primary border-b border-border p-2 ')}>
        <span className='text-3xl font-black text-start'>{price}</span>

        <div className='flex flex-col items-end gap-4 mr-auto '>
          <VariantSelect size={size} setSize={setSize} variants={variants} setProductPrice={setProductPrice} />
          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </div>

        <div className='relative'>
          <p onClick={() => setDisclaimer(!disclaimer)} className='text-lg cursor-pointer underline text-center'>
            Disclaimer*
          </p>
          {disclaimer && (
            <div ref={clickRef} className='p-2 absolute z-40 w-80 right-2 bg-bg-secondary border border-border'>
              <CloseIcon className='ml-auto' onClick={() => setDisclaimer(false)} />
              <p>
                Please be aware that objects in the background may be removed and images with complex outlines may be simplified for optimal printing quality.
              </p>
            </div>
          )}
        </div>

        {isSuccess && <p className='text-accent text-4xl'>Item added to cart</p>}
        <button disabled={!enabled} className={cn('bg-white text-black p-4', !enabled && 'opacity-30 cursor-default')} onClick={addVariantToCart}>
          {loading ? 'Adding To Cart...' : 'Add To Cart'}
        </button>
      </div>
    </>
  )
}

export default Form
