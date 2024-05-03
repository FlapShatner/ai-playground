import React, { useState, useEffect, useRef } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'
import { toast } from 'react-toastify'
import useIsSmall from '../hooks/useIsSmall'
import { cn, assemblePrompt } from '../utils'
import { getHoursAndMinutes, getTimeLeft } from '../utils/coolDownUtils'
import { upscale } from '../utils/apiUtils'
import { getSuggest } from '../utils/suggUtils'
import { wsUrl } from '../config'
import SubmitPrompt from './SubmitPrompt'
import Help from '../icons/Help'
import PromptGuide from '../info/PromptGuide'
import Suggestions from '../suggestions/Suggestions'
import TextArea from './TextArea'
import Step from './Step'
import useError from '../hooks/useError'
import OptionsGrid from './OptionsGrid'
import ProductsSelect from './ProductsSelect'
import Paste from '../icons/Paste'
import StyleSelect from './StyleSelect'
import Promo from '../promo/Promo'
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
 isPromoOpenAtom,
 timeLeftAtom,
 cooldownOpenAtom,
} from '../atoms'
import Cooldown from '../cooldown/Cooldown'
function Prompt() {
 const [history, setHistory] = useLocalStorage('history-new', [])
 const [genMeta, setGenMeta] = useLocalStorage('genMeta', {
  count: 0,
  cooldown: false,
  cooldownTime: 0,
 })
 const [showAlert, setShowAlert] = useState(false)
 const [highlightPrompt, setHighlightPrompt] = useState(false)
 const setCaption = useSetAtom(captionAtom)
 const setIsUpscaling = useSetAtom(isUpscalingAtom)
 const setModalIsOpen = useSetAtom(modalIsOpenAtom)
 const setSuggestions = useSetAtom(suggestionsAtom)
 const [isPromoOpen, setIsPromoOpen] = useAtom(isPromoOpenAtom)
 const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom)
 const [generated, setGenerated] = useAtom(generatedAtom)
 const [message, setMessage] = useAtom(messageAtom)
 const [prompt, setPrompt] = useAtom(promptAtom)
 const [wsId, setWsId] = useAtom(wsIdAtom)
 const imageStyle = useAtomValue(imageStyleAtom)
 const isOrdering = useAtomValue(isOrderingAtom)
 const shape = useAtomValue(shapeAtom)
 const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom)
 const [cooldownOpen, setCooldownOpen] = useAtom(cooldownOpenAtom)
 const { isError, useIsError } = useError()
 const isSmall = useIsSmall()

 const promptText = useRef(null)

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
    console.log('Sending generate')
    sendMessage(JSON.stringify({ event: 'generate', data: message, wsId: wsId }))
    setMessage(null)
   } else if (message.event === 'variations') {
    console.log('Sending variations')
    sendMessage(JSON.stringify({ event: 'variations', data: message, wsId: wsId }))
    setMessage(null)
   } else if (message.event === 'upscale') {
    console.log('Sending upscale')
    handleUpscale(message)
    setMessage(null)
    return
   }
  } else {
   console.log('Connection not open')
   useIsError()
  }
 }, [message])

 const alertToPrompt = () => {
  promptText.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  const triggerHighlight = (count) => {
   if (count === 0) return
   setHighlightPrompt(true)
   setTimeout(() => {
    setHighlightPrompt(false)
    setTimeout(() => {
     triggerHighlight(count - 1)
    }, 300)
   }, 300)
  }

  triggerHighlight(3) // Start the process 3 times
 }

 const startGen = async (currMeta) => {
  setGenMeta({ ...currMeta, count: currMeta.count + 1 })
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
   if (shape.id == 'wi1' && !isSmall) {
    setIsPromoOpen(true)
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

 const handleClick = async () => {
  if (shape.id == '') {
   toast.warning('Please choose a product to generate a design', { theme: 'colored', hideProgressBar: true, position: 'top-left' })
   return
  }
  if (prompt.length === 0) {
   alertToPrompt()
   toast.warning('Please enter a prompt to generate a design', { theme: 'colored', hideProgressBar: true, position: 'top-left' })
   return
  }
  let currentGenMeta = { ...genMeta }
  console.log('Cooldown Status:', currentGenMeta.cooldown)
  console.log('Cooldown Time:', currentGenMeta.cooldownTime)
  if (currentGenMeta.cooldown) {
   const currTimeLeft = getTimeLeft(currentGenMeta.cooldownTime)
   if (currTimeLeft <= 0) {
    console.log('Resetting Cooldown', currTimeLeft)
    currentGenMeta = { count: 0, cooldown: false, cooldownTime: 0 }
    return startGen(currentGenMeta)
   } else {
    const { hours, minutes } = getHoursAndMinutes(currTimeLeft)
    setTimeLeft(`${hours} hours and ${minutes} minutes`)
    setCooldownOpen(true)
    return
   }
  }
  if (genMeta.count >= 8) {
   console.log('Setting Cooldown', genMeta.count)
   setGenMeta({ count: 0, cooldown: true, cooldownTime: Date.now() })
   setTimeLeft('24 hours')
   setCooldownOpen(true)
   return
  }
  startGen(genMeta)
 }

 const handlePaste = () => {
  setPrompt(history[0].caption)
 }

 const handleClickNew = () => {
  setGenerated({ url: '', publicId: '', meta: {}, up: false })
  setPrompt('')
 }

 const newButton = generated.url.length > 0 && !isOrdering ? true : false

 return (
  <form className={cn('flex flex-col w-full justify-end', isSmall && 'w-full max-w-[700px] m-auto')}>
   <Cooldown />
   <DevTools />
   <Suggestions />
   <Promo />
   <div
    className={cn(
     'flex flex-col gap-4 w-full overflow-y-scroll max-h-[calc(80vh-86px)] p-4 pr-2 border-2 border-bg-secondary rounded-md',
     newButton && 'opacity-30 pointer-events-none',
     isSmall && newButton && 'hidden',
     isSmall && 'max-h-full'
    )}>
    <OptionsGrid />
    {/* <ProductsSelect /> */}
    <div className='w-full'>
     <div className=' w-full'>
      <StyleSelect />
     </div>
     <div className='flex justify-between mt-4'>
      <Step
       step='3'
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
     <div ref={promptText}>
      <TextArea
       highlightPrompt={highlightPrompt}
       handleClick={handleClick}
      />
     </div>
     {generated && (
      <div
       onClick={handlePaste}
       className='text-xs text-accent hover:text-accent-bright underline px-1 py-[2px] w-max mt-1 ml-auto cursor-pointer flex gap-1 items-center '>
       <Paste
        size='14px'
        color='rgb(210 172 83)'
       />
       paste in last prompt
      </div>
     )}
    </div>
   </div>
   {newButton ? (
    <SubmitPrompt onClick={handleClickNew}>Start a new design</SubmitPrompt>
   ) : (
    <SubmitPrompt
     step={!isGenerating}
     onClick={handleClick}>
     Generating...
    </SubmitPrompt>
   )}
   {/* <div onClick={() => setIsPromoOpen(true)} className='border border-border bg-red-700 mt-4'>open promo</div> */}
  </form>
 )
}

export default Prompt
