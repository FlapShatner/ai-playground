import { useEffect, useState, useRef } from 'react'
import Fallback from './Fallback'
import Price from './Price'
import useIsSmall from '../hooks/useIsSmall'
import Disclaimer from './Disclaimer'
import VariantSelect from '../form/VariantSelect'
import Notes from './Notes'
import AddToCart from './AddToCart'
import CancelCart from './CancelCart'
import Quantity from '../form/Quantity'
import { DevTools } from 'jotai-devtools'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useOnClickOutside } from 'usehooks-ts'
import { cn, getVariantType, getProductVariant } from '../utils'
import { getCurrentProduct } from '../utils/ajaxUtils'
import { sizeAtom, generatedAtom, productAtom, isOrderingAtom } from '../atoms'

function Form() {
 const [productTitle, setProductTitle] = useState('')
 const [disclaimer, setDisclaimer] = useState(false)
 const [product, setProduct] = useAtom(productAtom)
 const generated = useAtomValue(generatedAtom)
 const size = useAtomValue(sizeAtom)

 const isDecal = generated.shape.id == 'de1'
 const variant = isDecal ? size : getProductVariant(product.variants, generated.shape)

 const titles = {
  decal: 'Decal',
  print: 'Digital Print',
  banner: 'Banner',
  window: 'Truck Back Window Graphics',
  tshirt: 'T-Shirt',
  '3dprint': '3D Printed Model',
 }

 const clickRef = useRef()
 useOnClickOutside(clickRef, () => setDisclaimer(false))
 const isSmall = useIsSmall()

 useEffect(() => {
  const fetchProduct = async () => {
   const currentProduct = await getCurrentProduct()
   setProduct(currentProduct)
  }
  fetchProduct()
 }, [])

 useEffect(() => {
  const shape = generated.shape
  const variantType = getVariantType(shape)
  setProductTitle(titles[variantType])
 }, [generated])

 if (!product) return <Fallback />

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
      <Disclaimer
       ref={clickRef}
       setDisclaimer={setDisclaimer}
      />
     )}
     <Notes />
    </div>
    <div className='flex justify-center w-full gap-4'>
     <CancelCart />
     <AddToCart />
    </div>
   </div>
  </div>
 )
}

export default Form
