import { useState, useEffect } from 'react'
import { addToCart, getCart } from './utils'
import Gallery from './Gallery'
import Prompt from './Prompt'
import Image from './Image'
import Form from './Form'

export default function App({ home }) {
  const [generated, setGenerated] = useState('')
  const [caption, setCaption] = useState('')
  const [size, setSize] = useState('') // size is a variant id
  const [quantity, setQuantity] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

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
    <div className='bg-bg-primary max-w-[1080px] m-auto flex'>
      <Gallery setCaption={setCaption} setGenerated={setGenerated} />
      <div className='gap-4 flex flex-col md:flex-row p-4'>
        <div className='md:w-1/2 w-full'>
          <div className='flex flex-col-reverse gap-4'>
            <Prompt setCaption={setCaption} generated={generated} setGenerated={setGenerated} />
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
  )
}
