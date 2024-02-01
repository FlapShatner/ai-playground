import React from 'react'

function Image({ generated, caption }) {
  return (
    <div className=''>
      {generated ? (
        <div>
          <p className='text-center'>{caption}</p>
          <img src={generated} alt='' />
        </div>
      ) : (
        <div className='py-8'>
          <span className='text-xl text-accent-bright'>Describe a design below and our AI will generate it for you!</span>
        </div>
      )}
    </div>
  )
}

export default Image
