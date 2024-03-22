import React from 'react'
import { cn } from '../utils'
import { useSetAtom } from 'jotai'
import { isOrderingAtom } from '../atoms'

function CancelCart() {
 const setIsOrdering = useSetAtom(isOrderingAtom)
 const onCancel = () => {
  setIsOrdering(false)
 }
 return (
  <div
   className={cn(
    'bg-bg-secondary cursor-pointer text-accent border border-accent text-xl font-semibold rounded-md p-4 py-6 min-w-max disabled:opacity-20 disabled:cursor-not-allowed'
   )}
   onClick={onCancel}>
   Cancel
  </div>
 )
}

export default CancelCart
