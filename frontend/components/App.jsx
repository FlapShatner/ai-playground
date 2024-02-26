import { useState, useEffect } from 'react'
import { addToCart, getCart, cn } from './utils'
import { useWindowSize } from 'usehooks-ts'
import { prompts } from './prePrompt'
import Gallery from './Gallery'
import Prompt from './prompt/Prompt'
import Image from './image/Image'
import Form from './Form'
import Suggestions from './Suggestions'
import Banner from './banner/Banner'
import { useAtom } from 'jotai'
import {
  generatedAtom,
  captionAtom,
  sizeAtom,
  quantityAtom,
  isSuccessAtom,
  loadingAtom,
  imageStyleAtom,
  modalIsOpenAtom,
  suggestionsAtom,
  isLoadingAtom,
  notesAtom,
  cartAtom,
} from './atoms'

export default function App({ home }) {
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [caption, setCaption] = useAtom(captionAtom)
  const [size, setSize] = useAtom(sizeAtom)
  const [quantity, setQuantity] = useAtom(quantityAtom)
  const [isSuccess, setIsSuccess] = useAtom(isSuccessAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [imageStyle, setImageStyle] = useAtom(imageStyleAtom)
  const [modalIsOpen, setModalIsOpen] = useAtom(modalIsOpenAtom)
  const [suggestions, setSuggestions] = useAtom(suggestionsAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [notes, setNotes] = useAtom(notesAtom)
  const [cart, setCart] = useAtom(cartAtom)

  const { width } = useWindowSize()
  let isSmall = width < 640
  let isMedium = width < 768 && width >= 640

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

  let enabled = generated != '' && size != ''

  const addVariantToCart = async () => {
    setLoading(true)
    const res = await addToCart({
      ...formData,
      properties: {
        _image: generated,
        notes: notes,
      },
    })
    if (res) {
      // console.log(res)
      const ajaxCart = document.querySelector('.minicart__content')
      ajaxCart.innerHTML = res.sections['ajax-cart']
      // console.log('ajaxCart:', ajaxCart)
      setLoading(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
      setSize('')
    }
  }

  return (
    <div className='bg-bg-primary w-full max-w-[1200px] m-auto'>
      <Banner />
      <div className='w-full m-auto h-auto flex bg-bg-primary '>
        <img
          className='w-full max-w-[900px] m-auto my-4 px-8'
          src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706647115/Fonzie_Logo_6in_PNG_xuwf99.png'
          alt='Fonzie AI Generator Logo'
        />
      </div>
      <div id='appTop' className='bg-bg-primary w-full m-auto flex '>
        <div className='w-full gap-4 flex flex-col-reverse md:flex-row justify-center p-4 m-auto'>
          <div className={cn('flex flex-row gap-4 w-full', isSmall && 'flex-col-reverse')}>
            <Prompt />

            <Image />
            {/* {isSmall ? (
              <MobileForm
                size={size}
                setSize={setSize}
                quantity={quantity}
                setQuantity={setQuantity}
                addVariantToCart={addVariantToCart}
                enabled={enabled}
                isSuccess={isSuccess}
                loading={loading}
                generated={generated}
                notes={notes}
                setNotes={setNotes}
              />
            ) : (
              <Form
                generated={generated}
                size={size}
                setSize={setSize}
                quantity={quantity}
                setQuantity={setQuantity}
                addVariantToCart={addVariantToCart}
                enabled={enabled}
                isSuccess={isSuccess}
                loading={loading}
                notes={notes}
                setNotes={setNotes}
              />
            )} */}
          </div>
        </div>
      </div>
      <Suggestions suggestions={suggestions} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <Gallery setImageStyle={setImageStyle} setCaption={setCaption} generated={generated} setGenerated={setGenerated} />
      <div className='w-full h-[2px] bg-accent'></div>
    </div>
  )
}
