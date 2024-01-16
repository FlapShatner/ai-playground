import React from 'react'

function Image({ generated, caption }) {
  return (
    <div className='w-1/2'>
      {generated && (
        <div>
          <img src={generated} alt='' />
          <p className='text-center'>{caption}</p>
        </div>
      )}
    </div>
  )
}

export default Image
