import React from 'react'
import { cn } from '../utils'
import { useAtomValue } from 'jotai'
import { isOverlayAtom } from '../atoms'

function Overlay() {
  const isOverlay = useAtomValue(isOverlayAtom)
  return <div className={cn('absolute w-[100vw] h-[300vh] top-0 -left-10 bg-bg-primary opacity-60 z-20', isOverlay && 'hidden')}></div>
}

export default Overlay
