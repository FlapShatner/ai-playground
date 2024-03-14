import { useEffect } from 'react'
import { addToCart, getCart, cn } from './utils'
import useIsSmall from './hooks/useIsSmall'
import Gallery from './history/Gallery'
import Prompt from './prompt/Prompt'
import Image from './image/Image'
import Form from './form/Form'
import Suggestions from './suggestions/Suggestions'
import Banner from './banner/Banner'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { generatedAtom, sizeAtom, quantityAtom, isSuccessAtom, notesAtom, cartAtom, isOrderingAtom, addingToCartAtom } from './atoms'

export default function App({ home }) {
 const [size, setSize] = useAtom(sizeAtom)
 const [isSuccess, setIsSuccess] = useAtom(isSuccessAtom)
 const quantity = useAtomValue(quantityAtom)
 const generated = useAtomValue(generatedAtom)
 const notes = useAtomValue(notesAtom)
 const isOrdering = useAtomValue(isOrderingAtom)
 const setCart = useSetAtom(cartAtom)
 const setIsAddingToCart = useSetAtom(addingToCartAtom)

 const isSmall = useIsSmall()

 const formData = {
  id: size,
  quantity: quantity,
  sections: 'ajax-cart',
 }

 const cartCount = document.querySelector('.cart-count')

 useEffect(() => {
  const updateCount = async () => {
   const cart = await getCart()
   setCart(cart)
   if (cartCount) {
    cartCount.innerHTML = cart.item_count
    cartCount.classList.remove('hidden')
   }
  }
  updateCount()
 }, [isSuccess])

 const addVariantToCart = async () => {
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
   setIsSuccess(true)
   setTimeout(() => {
    setIsSuccess(false)
   }, 3000)
   setSize('')
  }
 }

 const isWindow = generated?.shape?.id == 'window'

 return (
  <div className='bg-bg-primary w-full max-w-[1200px] 2xl:max-w-[1600px] m-auto relative'>
   <Banner />
   <div className='w-full m-auto h-auto flex bg-bg-primary '>
    <img
     className='w-full max-w-[900px] m-auto my-4 px-8'
     src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706647115/Fonzie_Logo_6in_PNG_xuwf99.png'
     alt='Fonzie AI Generator Logo'
    />
   </div>
   <div
    id='appTop'
    className='bg-bg-primary w-full m-auto flex '>
    <div className='w-full gap-4 flex flex-col-reverse lg:flex-row justify-center p-4 m-auto'>
     <div className={cn('flex flex-row gap-4 w-full justify-center', isSmall && 'flex-col-reverse')}>
      {isOrdering && !isWindow ? <Form addVariantToCart={addVariantToCart} /> : <Prompt />}
      <Image />
     </div>
    </div>
   </div>
   <Suggestions />
   <Gallery />
   <div className='w-full h-[2px] bg-accent'></div>
  </div>
 )
}
