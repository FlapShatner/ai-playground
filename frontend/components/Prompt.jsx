import React, { useState } from 'react'
import StylePicker from './StylePicker'
import { useLocalStorage } from 'usehooks-ts'
import { generate, cn } from './utils'
import Loader from './loader/Loader'

function Prompt({ setGenerated, generated, setCaption, imageStyle, setImageStyle }) {
  const [history, setHistory] = useLocalStorage('history', [])
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const addToHistory = (prompt, url, style) => {
    let newHistory = [...history]
    if (newHistory.length >= 5) {
      newHistory.pop()
    }
    newHistory.unshift({ prompt, url, style })
    setHistory(newHistory)
  }

  const handleClick = () => {
    if (prompt) {
      const fullPrompt = prompt + ' ' + imageStyle.prompt
      setIsLoading(true)
      generate(fullPrompt).then(async (res) => {
        const json = await res.json()
        if (json.error) {
          alert('Something went wrong. Please try again.')
          setIsLoading(false)
          return
        }
        setGenerated(json.url)
        setCaption(prompt)
        addToHistory(prompt, json.url, imageStyle.id)
        console.log(json)
        setIsLoading(false)
        setPrompt('')
      })
    }
  }

  return (
    <div className='flex flex-col'>
      <textarea
        className='px-2 py-1 placeholder:opacity-60 border border-border'
        id='prompt'
        value={prompt}
        onChange={handleChange}
        type='text'
        placeholder='Enter a design prompt'
      />
      <StylePicker imageStyle={imageStyle} setImageStyle={setImageStyle} />
      <div className='cursor-pointer border border-border flex justify-center p-2 bg-bg-secondary mt-4 active:bg-black hover:text-accent' onClick={handleClick}>
        {isLoading ? (
          <div className={cn('flex items-center justify-center gap-3 text-lg')}>
            <Loader /> Working On It...
          </div>
        ) : !generated ? (
          <span className='text-lg'>Generate Design</span>
        ) : (
          <span className='text-lg text-txt-primary'>Generate A New Design</span>
        )}
      </div>
    </div>
  )
}

export default Prompt
