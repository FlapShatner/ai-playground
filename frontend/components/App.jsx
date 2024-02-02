import { useState, useEffect } from 'react'
import { addToCart, getCart } from './utils'
import { useWindowSize } from 'usehooks-ts'
import { prompts } from './prePrompt'
import Gallery from './Gallery'
import Prompt from './Prompt'
import Image from './Image'
import Form from './Form'
import Suggestions from './Suggestions'
import Banner from './banner/Banner'

export default function App({ home }) {
  const [generated, setGenerated] = useState('')
  const [caption, setCaption] = useState('')
  const [size, setSize] = useState('') // size is a variant id
  const [quantity, setQuantity] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageStyle, setImageStyle] = useState(prompts[0])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const { width } = useWindowSize()
  let isSmall = width < 640

  const [cart, setCart] = useState(null)

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
      },
    })
    if (res) {
      console.log(res)
      const ajaxCart = document.querySelector('.minicart__content')
      ajaxCart.innerHTML = res.sections['ajax-cart']
      console.log('ajaxCart:', ajaxCart)
      setLoading(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
      setSize('')
    }
  }

  return (
    <div className='bg-bg-primary w-full'>
      <Banner />
      <div className='w-full m-auto h-auto flex bg-bg-primary'>
        <img
          className='w-full max-w-[900px] m-auto my-4 px-8'
          src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706647115/Fonzie_Logo_6in_PNG_xuwf99.png'
          alt='Fonzie AI Generator Logo'
        />
      </div>
      <div id='appTop' className='bg-bg-primary max-w-[1200px] m-auto flex'>
        {/* <Gallery setImageStyle={setImageStyle} setCaption={setCaption} generated={generated} setGenerated={setGenerated} /> */}
        <div className='gap-4 flex flex-col-reverse md:flex-row justify-center p-4'>
          <Suggestions suggestions={suggestions} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
          {isSmall && <Gallery setImageStyle={setImageStyle} setCaption={setCaption} generated={generated} setGenerated={setGenerated} />}

          <Prompt
            setCaption={setCaption}
            generated={generated}
            setGenerated={setGenerated}
            imageStyle={imageStyle}
            setImageStyle={setImageStyle}
            setSuggestions={setSuggestions}
            setModalIsOpen={setModalIsOpen}
          />
          <div className='flex flex-row gap-4'>
            <Image caption={caption} generated={generated} />

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
            />
          </div>
        </div>
      </div>
      {!isSmall && <Gallery setImageStyle={setImageStyle} setCaption={setCaption} generated={generated} setGenerated={setGenerated} />}
      <div className='w-full h-[2px] bg-accent'></div>
    </div>
  )
}
