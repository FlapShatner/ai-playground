import React from 'react'

function Paste({ size, color, className }) {
  return (
    <svg className={className} xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24'>
      <path
        fill={color || 'currentColor'}
        d='M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1zM5.002 8L5 20h10V8zM9 6h8v10h2V4H9zm-2 5h6v2H7zm0 4h6v2H7z'
      />
    </svg>
  )
}

export default Paste
