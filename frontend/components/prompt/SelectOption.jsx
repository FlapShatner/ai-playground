import React from 'react'
import { cn } from '../utils'
import { useAtom } from 'jotai'
import { shapeAtom, sizeLabelAtom } from '../atoms'

function SelectOption({ option, setIsOpen }) {
  const [shape, setShape] = useAtom(shapeAtom)
  const [sizeLabel, setSizeLabel] = useAtom(sizeLabelAtom)
  const handleClick = () => {
    setIsOpen(false)
    setShape(option)
    setSizeLabel(option.label)
  }

  const isSelected = shape.id === option.id

  return (
    <div
      onClick={handleClick}
      key={option.id}
      className={cn('border border-border px-2 py-1 hover:bg-bg-primary', isSelected && 'border border-accent text-accent')}>
      {option.label}
    </div>
  )
}

export default SelectOption
