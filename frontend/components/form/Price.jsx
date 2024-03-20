import React from 'react'
import useIsSmall from '../hooks/useIsSmall'
import { formatPrice, cn } from '../utils'
import { useAtomValue } from 'jotai'
import { quantityAtom } from '../atoms'

function Price({ variant }) {
 if (!variant) return null
 const quantity = useAtom(quantityAtom)
 const isSmall = useIsSmall()
 const price = formatPrice(variant.price, quantity)

 return <span className={cn('text-4xl font-black text-end', isSmall && 'text-4xl')}>{price}</span>
}

export default Price
