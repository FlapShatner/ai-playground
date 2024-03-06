import React, { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import useIsSmall from '../hooks/useIsSmall'
import { generate, cn, getSuggest } from '../utils'
import useWebSocket from '../hooks/useWebSocket'
import Shape from './Shape'
import Guide from '../Guide'
import Help from '../icons/Help'
import Paste from '../icons/Paste'
import StyleSelect from './StyleSelect'
import { DevTools } from 'jotai-devtools'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  generatedAtom,
  captionAtom,
  imageStyleAtom,
  suggestionsAtom,
  modalIsOpenAtom,
  promptAtom,
  detailModeAtom,
  isGeneratingAtom,
  progressAtom,
  wsIdAtom,
} from '../atoms'

function Prompt() {
  const [history, setHistory] = useLocalStorage('history', [])
  const [isError, setIsError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [prompt, setPrompt] = useAtom(promptAtom)
  const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom)
  const wsId = useAtomValue(wsIdAtom)
  const imageStyle = useAtomValue(imageStyleAtom)
  const setProgress = useSetAtom(progressAtom)
  const setModalIsOpen = useSetAtom(modalIsOpenAtom)
  const setDetailMode = useSetAtom(detailModeAtom)
  const setSuggestions = useSetAtom(suggestionsAtom)
  const setCaption = useSetAtom(captionAtom)

  const isSmall = useIsSmall()
  useWebSocket('wss://mj-backend-i2y7w.ondigitalocean.app/')

  const addToHistory = (prompt, url, publicId, style, meta, up) => {
    let newHistory = [...history]
    newHistory.unshift({ prompt, url, publicId, style, meta, up })
    setHistory(newHistory)
  }

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleClick = () => {
    setProgress('1%')
    setGenerated({ url: '', publicId: '', meta: {}, up: false })
    if (prompt) {
      const fullPrompt = prompt.endsWith('noprompt') ? prompt : imageStyle.prompt + prompt
      const data = { prompt: fullPrompt, style: imageStyle.id, wsId: wsId }
      setIsGenerating(true)
      getSuggest(prompt).then(async (res) => {
        if (res.error || res.length === 0) {
          return
        }
        setSuggestions(res)
        setModalIsOpen(true)
      })
      if (!wsId) {
        console.error('WebSocket ID is not set')
        return
      }
      generate(data).then(async (res) => {
        if (!res.ok) {
          setIsGenerating(false)
          console.log(res.error)
          setIsError(true)
          setTimeout(() => {
            setIsError(false)
          }, 3000)
          return
        }
        const json = await res.json()
        setGenerated({ url: json.imgData.url, publicId: json.imgData.publicId, meta: json.meta, up: false })
        setDetailMode(false)
        setIsGenerating(false)
        setCaption(prompt)
        addToHistory(prompt, json.imgData.url, json.imgData.publicId, imageStyle.id, json.meta, false)
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
    <form className={cn('flex flex-col w-full justify-end', isSmall && 'w-full max-w-[700px] m-auto')}>
      <DevTools />
      {/* <span
        onClick={() => setIsOpen(true)}
        className='flex gap-1 items-center text-accent underline font-bold justify-end cursor-pointer hover:text-accent-bright'>
        User Guide
        <Help size='20px' color='rgb(210 172 83)' />
      </span> */}
      {/* <Guide isOpen={isOpen} setIsOpen={setIsOpen} /> */}

      <div className='flex flex-col items-end gap-4 w-full'>
        <Shape />
        <div className='w-full'>
          <textarea
            className={cn('px-2 py-1 h-48 placeholder:opacity-60 border border-border', isSmall && 'h-12')}
            id='prompt'
            value={prompt}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            type='text'
            placeholder='Enter a prompt here'
          />
          {generated && (
            <div
              onClick={handlePaste}
              className='text-xs text-accent hover:text-accent-bright underline px-1 py-[2px] w-max mt-1 ml-auto cursor-pointer flex gap-1 items-center'>
              <Paste size='14px' color='rgb(210 172 83)' />
              paste in last prompt
            </div>
          )}
        </div>
        <div className=' w-full'>
          <StyleSelect />
          <span className={cn('text-red-500 text-center mt-2', !isError && 'hidden')}>Something went wrong, please try again</span>
        </div>
      </div>

      <div
        role='button'
        type='submit'
        className='cursor-pointer border-2 flex justify-center sm:p-4 bg-bg-secondary active:scale-95 hover:bg-bg-primary text-accent border-accent h-[71px] w-full sm:w-full items-center mt-8 rounded-md'
        onClick={handleClick}>
        {isGenerating ? (
          <div className={cn('flex items-center justify-center gap-3 text-lg  font-semibold')}>Generating...</div>
        ) : (
          <span className='text-lg font-semibold'>Generate Design</span>
        )}
      </div>
    </form>
  )
}

export default Prompt
