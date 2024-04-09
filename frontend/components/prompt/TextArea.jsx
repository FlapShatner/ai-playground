import React from 'react'
import { cn } from '../utils'
import useIsSmall from '../hooks/useIsSmall'
import { useAtom } from 'jotai'
import { promptAtom } from '../atoms'

function TextArea({ handleClick, highlightPrompt }) {
    const isSmall = useIsSmall()
    const [prompt, setPrompt] = useAtom(promptAtom)

    const handleChange = (e) => {
        setPrompt(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleClick()
        }
    }
    return (
        <textarea
            className={cn('px-2 py-1 h-12 mt-2 placeholder:opacity-60 border border-border rounded-md', isSmall && 'h-12', highlightPrompt && 'border-accent-bright border-2')}
            id='prompt'
            value={prompt}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            type='text'
            placeholder='Enter a prompt here'
        />
    )
}

export default TextArea
