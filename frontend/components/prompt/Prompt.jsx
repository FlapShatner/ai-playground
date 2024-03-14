import React, { useState, useEffect, useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'
import useIsSmall from '../hooks/useIsSmall'
import { generate, cn, getSuggest, assemblePrompt, assembleCallData } from '../utils'
import Shape from './Shape'
import Options from './Options'
import Guide from '../Guide'
import Help from '../icons/Help'
import Paste from '../icons/Paste'
import StyleSelect from './StyleSelect'
import { DevTools } from 'jotai-devtools'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { isErrorAtom, generatedAtom, imageStyleAtom, promptAtom, isGeneratingAtom, wsIdAtom, shapeAtom, messageAtom } from '../atoms'

function Prompt() {
  const [history, setHistory] = useLocalStorage('history', [])
  const [showAlert, setShowAlert] = useState(false)
  const [isError, setIsError] = useAtom(isErrorAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [prompt, setPrompt] = useAtom(promptAtom)
  const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom)
  const [wsId, setWsId] = useAtom(wsIdAtom)
  const imageStyle = useAtomValue(imageStyleAtom)
  const shape = useAtomValue(shapeAtom)

  const [message, setMessage] = useAtom(messageAtom)

  const isSmall = useIsSmall()

  const WS_URL = 'wss://tunnel.ink-dev.com/'
  const { sendJsonMessage, sendMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    shouldReconnect: () => true,
  })

  useEffect(() => {
    console.log('Conn state changed', readyState)
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ event: 'init', data: { wsId: wsId } })
    }
  }, [ReadyState])

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.event === 'id') {
        console.log('lastJsonMessage', lastJsonMessage)
        setWsId(lastJsonMessage.id)
      }
    }
  }, [lastJsonMessage])

  useEffect(() => {
    if (!message) return
    if (message.event === 'generate') {
      sendMessage(JSON.stringify({ event: 'generate', data: message, wsId: wsId }))
    } else if (message.event === 'variations') {
      console.log('sending variations message', message)
      sendMessage(JSON.stringify({ event: 'variations', data: message, wsId: wsId }))
    } else if (message.event === 'upscale') {
      console.log('sending upscale message', message)
      sendMessage(JSON.stringify({ event: 'upscale', data: message, wsId: wsId }))
    }
  }, [message])

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleClick = () => {
    if (shape.id == '') {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      return
    }
    setGenerated({ url: '', publicId: '', meta: {}, up: false })
    if (prompt) {
      const callData = {
        event: 'generate',
        prompt: assemblePrompt(prompt, imageStyle.prompt, shape),
        caption: prompt,
        style: imageStyle.id,
        wsId: wsId,
        shape: shape,
      }
      setMessage(callData)
      setIsGenerating(true)
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

      <div className='flex flex-col gap-4 w-full'>
        <Options />
        <div className='w-full'>
          <div className={cn('text-red-500 font-bold text-center w-full m-auto mb-1', !showAlert && 'hidden')}>
            Please choose a product above to generate a design
          </div>
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
          <div className={cn('text-red-500 text-center m-auto mt-1 font-bold', !isError && 'hidden')}>Something went wrong, please try again</div>
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
          <span className='text-lg font-semibold'>Generate A New Design</span>
        )}
      </div>
    </form>
  )
}

export default Prompt
