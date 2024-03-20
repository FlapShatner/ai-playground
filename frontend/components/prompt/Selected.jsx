import React, { useState, useEffect } from 'react'
import { getVariants, upscale, cn, assemblePrompt, assembleCallData, makeString } from '../utils'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'
import Help from '../icons/Help'
import useIsSmall from '../hooks/useIsSmall'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
 messageAtom,
 activeIndexAtom,
 generatedAtom,
 captionAtom,
 imageStyleAtom,
 detailModeAtom,
 isMakingVariantsAtom,
 isUpscalingAtom,
 progressAtom,
 wsIdAtom,
 isGeneratingAtom,
 selectedGuideAtom,
} from '../atoms'
import SelectedGuide from '../info/SelectedGuide'

function Option({ children, className, optionId }) {
 const [isError, setIsError] = useState(false)
 const [message, setMessage] = useAtom(messageAtom)
 const [history, setHistory] = useLocalStorage('history-new', [])
 const [generated, setGenerated] = useAtom(generatedAtom)

 const activeIndex = useAtomValue(activeIndexAtom)
 const imageStyle = useAtomValue(imageStyleAtom)
 const caption = useAtomValue(captionAtom)
 const setDetailMode = useSetAtom(detailModeAtom)
 const setIsMakingVariants = useSetAtom(isMakingVariantsAtom)
 const setIsUpscaling = useSetAtom(isUpscalingAtom)
 const setProgress = useSetAtom(progressAtom)
 const setIsGenerating = useSetAtom(isGeneratingAtom)
 const wsId = useAtomValue(wsIdAtom)

 const isSmall = useIsSmall()

 const handleClick = async () => {
  setProgress('1%')
  if (optionId === 'vars') {
   const shape = generated.shape
   setIsMakingVariants(true)
   const prompt = assemblePrompt(caption, imageStyle.prompt, shape)
   const meta = makeString(generated.meta)
   const callData = {
    event: 'variations',
    meta: meta,
    activeIndex: activeIndex?.index + 1,
    prompt: prompt,
    shape: shape,
    caption: caption,
    style: imageStyle.id,
   }
   console.log('callData', callData)
   setMessage(callData)
  } else {
   const shape = generated.shape
   const prompt = generated.prompt
   const caption = generated.caption
   setIsUpscaling(true)
   const meta = makeString(generated.meta)
   const callData = {
    event: 'upscale',
    meta: meta,
    activeIndex: activeIndex?.index + 1,
    prompt: prompt,
    caption: caption,
    shape: shape,
    style: imageStyle.id,
    up: true,
   }
   setMessage(callData)
  }
 }

 return (
  <div
   onClick={handleClick}
   className={cn(
    'cursor-pointer border-2 border-accent p-4 text-center text-accent font-semibold bg-bg-secondary rounded-md ',
    className,
    isSmall && 'w-auto mx-4'
   )}>
   {children}
  </div>
 )
}

function Selected() {
 const [selectedGuide, setSelectedGuide] = useAtom(selectedGuideAtom)
 const isMakingVariants = useAtomValue(isMakingVariantsAtom)
 const isUpscaling = useAtomValue(isUpscalingAtom)
 const isSmall = useIsSmall()
 return (
  <div className={cn('flex gap-4 w-full justify-center mt-3 mb-3', isSmall && 'flex-col')}>
   <Option optionId='vars'>{isMakingVariants ? 'Making Variations' : 'Make Variations'}</Option>
   <Option optionId='up'>{isUpscaling ? 'Upscaling' : 'Upscale'}</Option>
   <SelectedGuide />
   <div
    onClick={() => setSelectedGuide(true)}
    className='grid place-content-center border-2 border-accent rounded-md cursor-pointer font-semibold w-14 text-4xl text-accent bg-bg-secondary'>
    ?
   </div>
  </div>
 )
}

export default Selected
