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
        <span className='text-xl text-accent'>Describe a design below and our AI will generate it for you!</span>
      )}
    </div>
  )
}

export default Image
