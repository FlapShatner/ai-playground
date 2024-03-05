import React from 'react'

function Arrow({ direction, className, size }) {
  return (
    <>
      {direction == 'left' ? (
        <svg className={className} width={size} height={size} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
          <path
            fill='currentColor'
            fillRule='evenodd'
            d='M7.222 9.897c2.3-2.307 4.548-4.559 6.744-6.754a.65.65 0 0 0 0-.896c-.311-.346-.803-.316-1.027-.08c-2.276 2.282-4.657 4.667-7.143 7.156c-.197.162-.296.354-.296.574c0 .221.099.418.296.592l7.483 7.306a.749.749 0 0 0 1.044-.029c.358-.359.22-.713.058-.881a3407.721 3407.721 0 0 1-7.16-6.988'
          />
        </svg>
      ) : (
        <svg className={className} width={size} height={size} viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
          <path
            fill='currentColor'
            fillRule='evenodd'
            d='m7.053 2.158l7.243 7.256a.66.66 0 0 1 .204.483a.705.705 0 0 1-.204.497c-2.62 2.556-5.145 5.023-7.575 7.401c-.125.117-.625.408-1.011-.024c-.386-.433-.152-.81 0-.966l7.068-6.908l-6.747-6.759c-.246-.339-.226-.652.06-.939c.286-.287.607-.3.962-.04'
          />
        </svg>
      )}
    </>
  )
}

export default Arrow
