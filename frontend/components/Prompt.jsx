import React, { useState } from 'react'
import StylePicker from './StylePicker'
import { useLocalStorage } from 'usehooks-ts'
import { generate, cn, getSuggest } from './utils'
import Loader from './loader/Loader'
import StyleSelect from './StyleSelect'
import { set } from 'react-hook-form'

function Prompt({ setGenerated, generated, setCaption, imageStyle, setImageStyle, setSuggestions, setModalIsOpen }) {
  const [history, setHistory] = useLocalStorage('history', [])
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const addToHistory = (prompt, url, style) => {
    let newHistory = [...history]
    // if (newHistory.length >= 5) {
    //   newHistory.pop()
    // }
    newHistory.unshift({ prompt, url, style })
    setHistory(newHistory)
  }

  const handleClick = () => {
    if (prompt) {
      const fullPrompt = prompt + ' ' + imageStyle.prompt
      const data = { prompt: prompt, fullPrompt: fullPrompt, style: imageStyle.id }
      setIsLoading(true)
      getSuggest(prompt).then(async (res) => {
        console.log('suggestions:', res)
        if (res.error || res.length === 0) {
          return
        }
        setSuggestions(res)
        setModalIsOpen(true)
      })
      generate(data).then(async (res) => {
        console.log('generated:', res)
        if (!res.ok) {
          setIsLoading(false)
          console.log(res.error)
          setIsError(true)
          setTimeout(() => {
            setIsError(false)
          }, 3000)
          return
        }
        const json = await res.json()
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
    <form className='flex flex-col'>
      <textarea
        className='px-2 py-1 placeholder:opacity-60 border border-border'
        id='prompt'
        value={prompt}
        onChange={handleChange}
        type='text'
        placeholder='Enter a design prompt'
      />

      <StyleSelect imageStyle={imageStyle} setImageStyle={setImageStyle} />
      <span className={cn('text-red-500 text-center mt-2', !isError && 'opacity-0')}>Something went wrong, please try again</span>
      <div
        role='button'
        type='submit'
        className='cursor-pointer border border-border flex justify-center p-2 bg-bg-secondary active:bg-black hover:text-accent'
        onClick={handleClick}>
        {isLoading ? (
          <div className={cn('flex items-center justify-center gap-3 text-lg')}>
            <Loader /> Generating...
          </div>
        ) : !generated ? (
          <span className='text-lg'>Generate Design</span>
        ) : (
          <span className='text-lg text-txt-primary'>Generate A New Design</span>
        )}
      </div>
    </form>
  )
}

export default Prompt
