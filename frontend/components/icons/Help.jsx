import React from 'react'
import { useAtom } from 'jotai'
import { promptGuideAtom, optionsGuideAtom } from '../atoms'

function Help({ size, color, className, id }) {
 const [promptGuide, setPromptGuide] = useAtom(promptGuideAtom)
 const [optionsGuide, setOptionsGuide] = useAtom(optionsGuideAtom)

 const handleClick = () => {
  if (id === 'promptGuide') {
   setPromptGuide(true)
  }
  if (id === 'optionsGuide') {
   setOptionsGuide(true)
  }
 }

 return (
  <svg
   onClick={handleClick}
   className={className}
   xmlns='http://www.w3.org/2000/svg'
   width={size}
   height={size}
   viewBox='0 0 24 24'>
   <path
    fill={color}
    d='M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22'
   />
  </svg>
 )
}

export default Help
