import React from 'react'
import Step from './Step'
import {cn} from '../utils'
function SubmitPrompt({ children, onClick, step }) {
 return (
  <div
   role='button'
   type='submit'
   className='cursor-pointer border-2 flex justify-center sm:p-4 bg-bg-secondary active:scale-95 hover:bg-bg-primary text-accent border-accent h-[71px] w-full sm:w-full items-center mt-8 rounded-md'
   onClick={onClick}>
   {step ? (
    <Step
     step='4'
     title='Generate a new design'
    />
   ) : (
    <div className={cn('flex items-center justify-center gap-3 text-lg  font-semibold')}>{children}</div>
   )}
  </div>
 )
}

export default SubmitPrompt
