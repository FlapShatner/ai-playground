import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { getCurrentProduct, formatPrice, cn, getVariantType, getProductVariant, addToCart } from '../utils'
import { toast } from 'react-toastify'
import CloseIcon from '../icons/CloseIcon'
import Price from './Price'
import { useOnClickOutside } from 'usehooks-ts'
import useIsSmall from '../hooks/useIsSmall'
import VariantSelect from '../form/VariantSelect'
import Quantity from '../form/Quantity'
import { DevTools } from 'jotai-devtools'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { sizeAtom, quantityAtom, isSuccessAtom, addingToCartAtom, generatedAtom, notesAtom, productAtom, isOrderingAtom } from '../atoms'
import { set } from 'react-hook-form'

function Form() {
 const [product, setProduct] = useAtom(productAtom)
 const [size, setSize] = useAtom(sizeAtom)
 const [quantity, setQuantity] = useAtom(quantityAtom)
 const [notes, setNotes] = useAtom(notesAtom)
 const [generated, setGenerated] = useAtom(generatedAtom)
 const [productTitle, setProductTitle] = useState('')
 const [disclaimer, setDisclaimer] = useState(false)
 const [isAddingToCart, setIsAddingToCart] = useAtom(addingToCartAtom)
 const isSuccess = useAtomValue(isSuccessAtom)
 const setIsOrdering = useSetAtom(isOrderingAtom)

 const clickRef = useRef()
 useOnClickOutside(clickRef, () => setDisclaimer(false))
 const isSmall = useIsSmall()

 //  console.log('formData', formData)

 const addVariantToCart = async (variant) => {
  const formData = {
   id: variant.id,
   quantity: quantity,
   sections: 'ajax-cart',
  }
  setIsAddingToCart(true)
  const res = await addToCart({
   ...formData,
   properties: {
    _image: generated.url,
    notes: notes,
   },
  })
  if (res) {
   const ajaxCart = document.querySelector('.minicart__content')
   ajaxCart.innerHTML = res.sections['ajax-cart']
   setIsAddingToCart(false)
   toast.success('Item added to cart', { theme: 'dark' })
   //    setIsSuccess(true)
   //    setTimeout(() => {
   //     setIsSuccess(false)
   //    }, 3000)
  }
 }

 useEffect(() => {
  const fetchProduct = async () => {
   const currentProduct = await getCurrentProduct()
   setProduct(currentProduct)
   //    setProductPrice(currentProduct.price)
  }
  fetchProduct()
 }, [])

 const titles = {
  decal: 'Decal',
  print: 'Digital Print',
  banner: 'Banner',
  window: 'Truck Back Window Graphics',
  tshirt: 'T-Shirt',
  '3dprint': '3D Printed Model',
 }

 useEffect(() => {
  const shape = generated.shape
  const variantType = getVariantType(shape)
  setProductTitle(titles[variantType])
 }, [generated])

 const onCancel = () => {
  setIsOrdering(false)
 }

 if (!product) return <h1>Loading...</h1>

 const isDecal = generated.shape.id == 'de1'
 const variant = isDecal ? size : getProductVariant(product.variants, generated.shape)
 console.log('variant', variant)

 return (
  <div className='flex w-full'>
   <DevTools />
   <div className={cn('w-full flex flex-col justify-end gap-4 text-txt-primary pl-0', isSmall && 'max-w-[700px] m-auto')}>
    <div className='text-2xl w-full text-end'>{`AI Designed ${productTitle}, ${generated.shape.label}`}</div>

    <Price variant={variant} />
    <div className={cn('flex flex-col items-end gap-4 ml-auto', isSmall && 'flex-row')}>
     {generated.shape.id == 'de1' && <VariantSelect product={product} />}
     <Quantity />
    </div>

    <div className='relative'>
     <p
      onClick={() => setDisclaimer(!disclaimer)}
      className='text-lg cursor-pointer underline text-end'>
      Disclaimer*
     </p>
     {disclaimer && (
      <div
       ref={clickRef}
       className='p-3 pt-4 absolute z-40 w-80 right-2 bg-bg-secondary border border-border'>
       <CloseIcon
        className='ml-auto absolute right-4 top-2 cursor-pointer'
        onClick={() => setDisclaimer(false)}
       />
       <p>Please be aware that objects in the background may be removed and images with complex outlines may be simplified for optimal printing quality.</p>
      </div>
     )}
     <div className='mt-4'>
      <label
       className='text-sm'
       htmlFor='notes'>
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
      disabled={(isDecal && size === '') || quantity === 0}
      className={cn('bg-accent cursor-pointer w-full text-black text-xl font-semibold rounded-md p-4 py-6 disabled:opacity-20 disabled:cursor-not-allowed')}
      onClick={() => addVariantToCart(variant)}>
      {isAddingToCart ? 'Adding to card...' : 'Add to cart'}
     </button>
    </div>
   </div>
  </div>
 )
}

export default Form
