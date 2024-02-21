import React, { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { generate, cn, getSuggest } from './utils'
import Guide from './Guide'
import Help from './icons/Help'
import DownArrow from './icons/downArrow'
import Loader from './loader/Loader'
import StyleSelect from './StyleSelect'

function Prompt({ setGenerated, generated, setCaption, imageStyle, setImageStyle, setSuggestions, setModalIsOpen, isLoading, setIsLoading }) {
  const [history, setHistory] = useLocalStorage('history', [])
  const [prompt, setPrompt] = useState('')
  const [isError, setIsError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
        // console.log('suggestions:', res)
        if (res.error || res.length === 0) {
          return
        }
        setSuggestions(res)
        setModalIsOpen(true)
      })
      generate(data).then(async (res) => {
        // console.log('generated:', res)
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
        // console.log(json)
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
      <span
        onClick={() => setIsOpen(true)}
        className='flex gap-1 items-center text-accent underline font-bold justify-end cursor-pointer hover:text-accent-bright'>
        <Help size='20px' color='rgb(210 172 83)' /> User Guide
      </span>
      <Guide isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className='sm:flex sm:justify-between sm:items-end sm:gap-4 md:flex-col md:items-start'>
        <div className=' sm:w-2/3 md:w-full'>
          <textarea
            className='px-2 py-1 h-12 placeholder:opacity-60 border border-border'
            id='prompt'
            value={prompt}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            type='text'
            placeholder='Enter a prompt here'
          />
          {generated && (
            <div onClick={handlePaste} className='text-xs border border-border px-1 py-[2px] w-max mt-1 ml-auto cursor-pointer flex gap-1 items-center'>
              click to paste in your last prompt
            </div>
          )}
        </div>
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
