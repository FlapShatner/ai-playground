import React, { useState } from 'react'
import StylePicker from './StylePicker'
import { useLocalStorage } from 'usehooks-ts'
import { generate, cn, getSuggest } from './utils'
import DownArrow from './icons/downArrow'
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleClick()
    }
  }

  const handlePaste = () => {
    setPrompt(history[0].prompt)
  }

  return (
    <form className='flex flex-col md:w-1/3'>
      {generated && (
        <div onClick={handlePaste} className='text-xs border border-border p-1 w-max mb-1 ml-auto cursor-pointer flex gap-1 items-center'>
          click to paste in your last prompt
        </div>
      )}
      <div className='sm:flex sm:justify-between sm:items-end sm:gap-4 md:flex-col md:items-start'>
        <textarea
          className='px-2 py-1 h-12 placeholder:opacity-60 border border-border sm:w-2/3 md:w-full'
          id='prompt'
          value={prompt}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          type='text'
          placeholder='Enter a prompt here'
        />

        <div className='sm:w-1/3 md:w-full'>
          <StyleSelect imageStyle={imageStyle} setImageStyle={setImageStyle} />
          <span className={cn('text-red-500 text-center mt-2', !isError && 'hidden')}>Something went wrong, please try again</span>
        </div>
      </div>
      <div
        role='button'
        type='submit'
        className='cursor-pointer border-2 flex justify-center sm:p-4 bg-bg-secondary active:scale-95 hover:bg-bg-primary text-accent border-accent h-[71px] w-full sm:w-auto items-center mb-12 mt-8'
        onClick={handleClick}>
        {isLoading ? (
          <div className={cn('flex items-center justify-center gap-3 text-lg')}>
            <Loader /> Generating...
          </div>
        ) : (
          <span className='text-lg'>Generate Design</span>
        )}
      </div>
    </form>
  )
}

export default Prompt
