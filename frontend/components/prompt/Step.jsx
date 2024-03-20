import React from 'react'

function Step({ step, title, desc }) {
 return (
  <span className='text-lg flex items-center gap-3 text-accent font-bold'>
   <div className='flex justify-center items-center p-2 w-10 h-10 rounded-full border-2 border-accent bg-accent text-bg-primary text-2xl font-bold'>{step}</div>
   <div>
    {title}
    <p className='text-base font-normal'>{desc}</p>
   </div>
  </span>
 )
}

export default Step
