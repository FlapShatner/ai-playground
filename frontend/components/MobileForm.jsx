import React, { useState } from 'react'
import Form from './Form'
import Chevron from './icons/Chevron'

function MobileForm({ generated, size, setSize, quantity, setQuantity, addVariantToCart, enabled, isSuccess, loading }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='border-2 border-accent-bright bg-accent bg-opacity-20'>
      {generated && (
        <div onClick={() => setOpen(!open)} className='text-center text-accent text-xl p-2 '>
          {!open && 'Order This Decal'}
          <Chevron color='#d2ac53' className='m-auto bg-transparent' direction={open ? 'up' : 'down'} />
        </div>
      )}
      {open && (
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
      )}
    </div>
  )
}

export default MobileForm
