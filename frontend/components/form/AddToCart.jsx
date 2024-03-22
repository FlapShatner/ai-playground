import React from 'react'
import { useAtom } from 'jotai'
import { toast } from 'react-toastify'
import { cn, getProductVariant } from '../utils'
import { getCart, addToCart } from '../utils/ajaxUtils'
import { generatedAtom, sizeAtom, quantityAtom, addingToCartAtom, productAtom, cartAtom, notesAtom } from '../atoms'

function AddToCart() {
 const cartCount = document.querySelector('.cart-count')
 const [product, setProduct] = useAtom(productAtom)
 const [generated, setGenerated] = useAtom(generatedAtom)
 const [size, setSize] = useAtom(sizeAtom)
 const [quantity, setQuantity] = useAtom(quantityAtom)
 const [isAddingToCart, setIsAddingToCart] = useAtom(addingToCartAtom)
 const [notes, setNotes] = useAtom(notesAtom)
 const [cart, setCart] = useAtom(cartAtom)
 const isDecal = generated.shape.id == 'de1'
 const variant = isDecal ? size : getProductVariant(product.variants, generated.shape)

 const updateCount = async () => {
  const cart = await getCart()
  setCart(cart)
  if (cartCount) {
   cartCount.innerHTML = cart.item_count
   cartCount.classList.remove('hidden')
  }
 }

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
   updateCount()
   const ajaxCart = document.querySelector('.minicart__content')
   ajaxCart.innerHTML = res.sections['ajax-cart']
   setIsAddingToCart(false)
   toast.success('Item added to cart', { theme: 'colored', hideProgressBar: true })
  }
 }
 return (
  <button
   disabled={(isDecal && size === '') || quantity === 0}
   className={cn('bg-accent cursor-pointer w-full text-black text-xl font-semibold rounded-md p-4 py-6 disabled:opacity-20 disabled:cursor-not-allowed')}
   onClick={() => addVariantToCart(variant)}>
   {isAddingToCart ? 'Adding to card...' : 'Add to cart'}
  </button>
 )
}

export default AddToCart
