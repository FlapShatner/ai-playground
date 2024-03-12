import React from 'react'
import Check from '../icons/Check'
import { cn } from '../utils'

export default function Checkbox({ onClick, isChecked, id }) {
  return (
    <div onClick={onClick} className={cn('min-w-4 bg-white h-4 rounded-sm cursor-pointer', isChecked && 'bg-accent')}>
      <div>{isChecked && <Check />}</div>
    </div>
  )
}
