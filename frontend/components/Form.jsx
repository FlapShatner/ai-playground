import React, { useState } from 'react'
import StylePicker from './StylePicker'
import { generate } from './utils'
import { prePrompt } from './prePrompt'
import Loader from './loader/Loader'

function Form({ setGenerated, setCaption }) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imageStyle, setImageStyle] = useState('vivid')

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleClick = () => {
    if (prompt) {
      const fullPrompt = prePrompt + prompt
      setIsLoading(true)
      generate(fullPrompt, imageStyle).then(async (res) => {
        const json = await res.json()
        setGenerated(json.url)
        setCaption(prompt)
        console.log(json)
        setIsLoading(false)
        setPrompt('')
      })
    }
  }

  return (
    <div className='flex flex-col gap-4 w-1/2'>
      <textarea
        className='px-2 py-1 placeholder:opacity-60 border border-border'
        id='prompt'
        value={prompt}
        onChange={handleChange}
        type='text'
        placeholder='Enter a design prompt'
      />

      <div className='border border-border flex justify-center p-2 bg-bg-secondary' onClick={handleClick}>
        {isLoading ? (
          <div className='flex items-center justify-center gap-3 text-lg '>
            <Loader /> Working On It...
          </div>
        ) : (
          <span className='text-lg'>Generate Design</span>
        )}
      </div>
    </div>
  )
}

export default Form
