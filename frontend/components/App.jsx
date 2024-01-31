import { useState, useEffect } from 'react'
import { addToCart, getCart } from './utils'
import { prompts } from './prePrompt'
import Gallery from './Gallery'
import Prompt from './Prompt'
import Image from './Image'
import Form from './Form'
import Suggestions from './Suggestions'

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
    <div className='bg-bg-primary'>
      <div className='m-auto h-auto flex bg-bg-primary'>
        <img
          className='w-full max-w-[900px] m-auto my-4 px-8'
          src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706647115/Fonzie_Logo_6in_PNG_xuwf99.png'
          alt='Fonzie AI Generator Logo'
        />
      </div>
      <p className='text-[#FCC000] text-base sm:text-3xl text-center p-4 font-bold'>
        Let our AI create a one-of-a-kind design for you!<br></br> We'll ship it right to your door!
      </p>
      <div id='appTop' className='bg-bg-primary max-w-[1200px] m-auto flex'>
        <Gallery setImageStyle={setImageStyle} setCaption={setCaption} generated={generated} setGenerated={setGenerated} />
        <div className='gap-4 flex flex-col md:flex-row p-4'>
          <div className='md:w-1/2 w-full'>
            <div className='flex flex-col-reverse gap-4'>
              <Suggestions suggestions={suggestions} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
              <Prompt
                setCaption={setCaption}
                generated={generated}
                setGenerated={setGenerated}
                imageStyle={imageStyle}
                setImageStyle={setImageStyle}
                setSuggestions={setSuggestions}
                setModalIsOpen={setModalIsOpen}
              />

              <Image caption={caption} generated={generated} />
            </div>
          </div>
          <Form
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
  )
}
