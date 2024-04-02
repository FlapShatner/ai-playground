import React from 'react'
import { cn } from '../utils'
import { useAtom, useSetAtom } from 'jotai'
import { shapeAtom, sizeLabelAtom } from '../atoms'

function SelectOption({ option, setIsOpen, len, i }) {
    const [shape, setShape] = useAtom(shapeAtom)
    const setSizeLabel = useSetAtom(sizeLabelAtom)
    const handleClick = (e) => {
        e.stopPropagation()
        setIsOpen(false)
        setShape(option)
        setSizeLabel(option.label)
    }

    const isSelected = shape.id === option.id
    const isLast = i === len - 1

    return (
        <div
            onClick={handleClick}
            key={option.id}
            className={cn('border border-border px-2 py-1 hover:bg-bg-primary text-center', isSelected && 'border border-accent text-accent ', isLast && 'rounded-b-md')}>
            {option.label}
        </div>
    )
}

export default SelectOption
