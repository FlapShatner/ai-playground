import React from 'react'
import { useAtom } from 'jotai'
import { generatedAtom, promptAtom } from '../atoms'

function Upscaled() {
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [prompt, setPrompt] = useAtom(promptAtom)
  return (
    <div>
      <img src={generated.url} alt={prompt} />
    </div>
  )
}

export default Upscaled
