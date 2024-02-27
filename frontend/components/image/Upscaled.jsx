import React from 'react'
import { useAtom } from 'jotai'
import { generatedAtom, promptAtom } from '../atoms'

function Upscaled() {
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [prompt, setPrompt] = useAtom(promptAtom)
  return (
    <a href={generated.url} target='_blank' rel='noopener noreferrer'>
      <img className='cursor-zoom-in' src={generated.url} alt={prompt} />
    </a>
  )
}

export default Upscaled
