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
  const [modalIsOpen, setModalIsOpen] = useState(true)

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
      <div className='m-auto -mb-[80px] bg-bg-primary'>
        <img
          className=' m-auto h-[480px]'
          src='https://res.cloudinary.com/dkxssdk96/image/upload/v1706132249/Fonzie_Logo_PNG_1706127396_uoieys.png'
          alt='Fonzie AI Generator Logo'
        />
      </div>
      <div id='appTop' className='bg-bg-primary max-w-[1200px] m-auto flex'>
        <Gallery setImageStyle={setImageStyle} setCaption={setCaption} generated={generated} setGenerated={setGenerated} />
        <div className='gap-4 flex flex-col md:flex-row p-4'>
          <div className='md:w-1/2 w-full'>
            <div className='flex flex-col-reverse gap-4'>
              {/* <Suggestions modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} /> */}
              <Prompt setCaption={setCaption} generated={generated} setGenerated={setGenerated} imageStyle={imageStyle} setImageStyle={setImageStyle} />
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
