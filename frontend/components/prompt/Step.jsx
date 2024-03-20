import React from 'react'

function Step({ step, title }) {
 return (
  <span className='text-lg flex items-end gap-3 text-accent font-bold'>
   <div className='flex justify-center items-center p-2 w-10 h-10 rounded-full border-2 border-accent bg-accent text-bg-primary text-2xl font-bold'>{step}</div>
   {title}
  </span>
 )
}

export default Step
