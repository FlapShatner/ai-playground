import React from 'react'
import { cn, makeString } from '../utils'
import { upscale } from '../utils/apiUtils'
import useError from '../hooks/useError'
import { useLocalStorage } from 'usehooks-ts'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { isOrderingAtom, generatedAtom, activeIndexAtom, isUpscalingAtom, captionAtom, imageStyleAtom, promptAtom, messageAtom, wsIdAtom } from '../atoms'

function Order() {
 const [history, setHistory] = useLocalStorage('history-new', [])
 const [windowProduct, setWindowProduct] = useLocalStorage('windowProduct', {})
 const [isOrdering, setIsOrdering] = useAtom(isOrderingAtom)
 const [generated, setGenerated] = useAtom(generatedAtom)
 const activeIndex = useAtomValue(activeIndexAtom)
 const wsId = useAtomValue(wsIdAtom)
 const imageStyle = useAtomValue(imageStyleAtom)
 const setCaption = useSetAtom(captionAtom)
 const setIsUpscaling = useSetAtom(isUpscalingAtom)
 const setMessage = useSetAtom(messageAtom)
 const setPrompt = useSetAtom(promptAtom)

 const addToHistory = (generatedObj) => {
  let newHistory = [...history]
  newHistory.unshift(generatedObj)
  setHistory(newHistory)
 }

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
   useError()
   setIsUpscaling(false)
  }
 }

 const upscaleImage = async () => {
  setIsUpscaling(true)
  const meta = makeString(generated.meta)
  const callData = {
   event: 'upscale',
   meta: meta,
   activeIndex: activeIndex?.index + 1,
   prompt: generated.prompt,
   caption: generated.caption,
   shape: generated.shape,
   style: imageStyle.id,
   up: true,
  }
  handleUpscale(callData, wsId)
  setMessage(null)
 }

 const goToUrl = (url) => {
  window.location.href = url
 }

 const checkIsWindow = () => {
  if (generated.shape.id == 'wi1') {
   setWindowProduct(generated)
   goToUrl('/products/ai-truck-back-window-graphics')
  }
 }

 const handleOrder = async () => {
  if (generated.up) {
   checkIsWindow()
   setIsOrdering(true)
  } else {
   await upscaleImage()
   checkIsWindow()
   setIsOrdering(true)
  }
 }

 return (
  <div
   onClick={handleOrder}
   className={cn(
    'flex flex-col cursor-pointer border border-accent p-4 text-center text-bg-secondary font-semibold m-4 bg-accent hover:bg-accent-bright rounded-md',
    isOrdering && 'hidden'
   )}>
   <span className='text-xl'>Buy as a decal!</span>
   <span className='text-sm font-semibold'>Click to choose size and quantity</span>
  </div>
 )
}

export default Order
