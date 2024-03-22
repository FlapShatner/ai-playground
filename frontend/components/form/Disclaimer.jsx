import React, {forwardRef, useState} from 'react'
import { cn } from '../utils'
import  CloseIcon  from '../icons/CloseIcon'


const Disclaimer = forwardRef((props, ref) => {
    const clickRef = ref
    const {setDisclaimer} = props
    return (
        <div
       ref={clickRef}
       className='p-3 pt-4 absolute z-40 w-80 right-2 bg-bg-secondary border border-border'>
       <CloseIcon
        className='ml-auto absolute right-4 top-2 cursor-pointer'
        onClick={() => setDisclaimer(false)}
       />
       <p>Please be aware that objects in the background may be removed and images with complex outlines may be simplified for optimal printing quality.</p>
      </div>
    )
    })

export default Disclaimer