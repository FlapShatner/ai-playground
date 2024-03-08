import React from 'react'
import Check from '../icons/Check'
import { cn } from '../utils'

export default function Checkbox({ onClick, isChecked, id }) {
  return (
    <div onClick={onClick} className={cn('w-4 bg-white h-4 rounded-sm', isChecked && 'bg-accent')}>
      {/* <Check /> */}
      {/* <div>{isChecked && <Icons name='check' color='black' size='16px' />}</div> */}
    </div>
  )
}
