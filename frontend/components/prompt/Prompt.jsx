import React, { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'
import { toast } from 'react-toastify'
import useIsSmall from '../hooks/useIsSmall'
import { upscale, cn, assemblePrompt, wsUrl, getSuggest } from '../utils'
import Help from '../icons/Help'
import PromptGuide from '../info/PromptGuide'
import Suggestions from '../suggestions/Suggestions'
import Step from './Step'
import useError from '../hooks/useError'
import OptionsGrid from './OptionsGrid'
import Paste from '../icons/Paste'
import StyleSelect from './StyleSelect'
import { DevTools } from 'jotai-devtools'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
 captionAtom,
 generatedAtom,
 imageStyleAtom,
 promptAtom,
 isGeneratingAtom,
 wsIdAtom,
 shapeAtom,
 messageAtom,
 isUpscalingAtom,
 modalIsOpenAtom,
 suggestionsAtom,
 isOrderingAtom,
} from '../atoms'

function Prompt() {
 const [history, setHistory] = useLocalStorage('history-new', [])
 const [showAlert, setShowAlert] = useState(false)
 const setCaption = useSetAtom(captionAtom)
 const setIsUpscaling = useSetAtom(isUpscalingAtom)
 const setModalIsOpen = useSetAtom(modalIsOpenAtom)
 const setSuggestions = useSetAtom(suggestionsAtom)
 const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom)
 const [generated, setGenerated] = useAtom(generatedAtom)
 const [message, setMessage] = useAtom(messageAtom)
 const [prompt, setPrompt] = useAtom(promptAtom)
 const [wsId, setWsId] = useAtom(wsIdAtom)
 const imageStyle = useAtomValue(imageStyleAtom)
 const isOrdering = useAtomValue(isOrderingAtom)
 const shape = useAtomValue(shapeAtom)
 const { isError, useIsError } = useError()
 const isSmall = useIsSmall()

 const WS_URL = wsUrl
 const { sendJsonMessage, sendMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
  share: true,
  shouldReconnect: () => true,
 })

 const connectionStatus = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
 }[readyState]

 const addToHistory = (generatedObj) => {
  let newHistory = [...history]
  newHistory.unshift(generatedObj)
  setHistory(newHistory)
 }

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

 const handleUpscale = async (message, wsId) => {
  const response = await upscale(message, wsId)
  if (response.ok) {
   const { imgData, meta, prompt, caption, shape, event } = response.resp
   const generatedObj = {
    url: imgData.url,
    publicId: imgData.publicId,
    meta: meta,
    up: event === 'upscale' ? true : false,
    shape: shape,
    prompt: prompt,
    caption: caption,
   }
   setGenerated(generatedObj)
   setIsUpscaling(false)
   setCaption(caption)
   addToHistory(generatedObj)
   setPrompt('')
  } else {
   useIsError()
   setIsUpscaling(false)
  }
 }

 useEffect(() => {
  if (!message) return
  if (connectionStatus === 'Open') {
   if (message.event === 'generate') {
    sendMessage(JSON.stringify({ event: 'generate', data: message, wsId: wsId }))
   } else if (message.event === 'variations') {
    sendMessage(JSON.stringify({ event: 'variations', data: message, wsId: wsId }))
   } else if (message.event === 'upscale') {
    handleUpscale(message)
    setMessage(null)
    return
   }
  } else {
   console.log('Connection not open')
   useIsError()
  }
 }, [message])

 const handleChange = (e) => {
  setPrompt(e.target.value)
 }

 const handleClick = async () => {
  if (shape.id == '') {
   toast.warning('Please choose a product to generate a design', { theme: 'colored', hideProgressBar: true, position: 'top-left' })
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
   const suggestions = await getSuggest(prompt)
   console.log('suggestions', suggestions)
   if (suggestions.length > 0) {
    setSuggestions(suggestions)
    setModalIsOpen(true)
   }
   setMessage(callData, wsId)
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

 const handleClickNew = () => {
  setGenerated({ url: '', publicId: '', meta: {}, up: false })
  setPrompt('')
 }

 const newButton = generated.url.length > 0 && !isOrdering ? true : false

 return (
  <form className={cn('flex flex-col w-full justify-end', isSmall && 'w-full max-w-[700px] m-auto')}>
   <DevTools />
   <Suggestions />
   <div className={cn('flex flex-col gap-4 w-full', newButton && 'opacity-30 pointer-events-none')}>
    <OptionsGrid />
    <div className='w-full'>
     <div className='flex justify-between'>
      <Step
       step='2'
       title='Describe your design'
       desc='Anything you can imagine, describe it here and generate a new design based on your idea.'
      />
      <Help
       size='24px'
       color='#d2ac53'
       className='cursor-pointer min-w-6'
       id='promptGuide'
      />
      <PromptGuide />
     </div>

     <textarea
      className={cn('px-2 py-1 h-12 mt-2 placeholder:opacity-60 border border-border rounded-md', isSmall && 'h-12')}
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
       <Paste
        size='14px'
        color='rgb(210 172 83)'
       />
       paste in last prompt
      </div>
     )}
    </div>
    <div className=' w-full'>
     <StyleSelect />
     <div className={cn('text-red-500 text-center m-auto mt-1 font-bold', !isError && 'hidden')}>Something went wrong, please try again</div>
    </div>
   </div>

   {newButton ? (
    <div
     role='button'
     type='submit'
     className='cursor-pointer border-2 flex justify-center sm:p-4 bg-bg-secondary active:scale-95 hover:bg-bg-primary text-accent border-accent h-[71px] w-full sm:w-full items-center mt-8 rounded-md'
     onClick={handleClickNew}>
     <div className={cn('flex items-center justify-center gap-3 text-lg  font-semibold')}>Start a new design</div>
    </div>
   ) : (
    <div
     role='button'
     type='submit'
     className='cursor-pointer border-2 flex justify-center sm:p-4 bg-bg-secondary active:scale-95 hover:bg-bg-primary text-accent border-accent h-[71px] w-full sm:w-full items-center mt-8 rounded-md'
     onClick={handleClick}>
     {isGenerating ? (
      <div className={cn('flex items-center justify-center gap-3 text-lg  font-semibold')}>Generating...</div>
     ) : (
      <Step
       step='4'
       title='Generate a new design'
      />
     )}
    </div>
   )}
  </form>
 )
}

export default Prompt
