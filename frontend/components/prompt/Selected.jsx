import React, { useState, useEffect } from 'react'
import { getVariants, upscale, cn, assemblePrompt, assembleCallData, makeString } from '../utils'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'
import useIsSmall from '../hooks/useIsSmall'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
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
} from '../atoms'

function Option({ children, className, optionId }) {
  const [isError, setIsError] = useState(false)
  const [history, setHistory] = useLocalStorage('history', [])
  const [generated, setGenerated] = useAtom(generatedAtom)
  const activeIndex = useAtomValue(activeIndexAtom)
  const imageStyle = useAtomValue(imageStyleAtom)
  const caption = useAtomValue(captionAtom)
  const setDetailMode = useSetAtom(detailModeAtom)
  const setIsMakingVariants = useSetAtom(isMakingVariantsAtom)
  const setIsUpscaling = useSetAtom(isUpscalingAtom)
  const setProgress = useSetAtom(progressAtom)
  const setIsGenerating = useSetAtom(isGeneratingAtom)

  const WS_URL = 'wss://home.ink-dev.com/'
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  })

  useEffect(() => {
    console.log('Conn state changed', readyState)
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ event: 'init', data: { wsId: wsId } })
    }
  }, [ReadyState])

  const isSmall = useIsSmall()

  const addToHistory = (prompt, url, publicId, style, meta, up, shape) => {
    let newHistory = [...history]
    newHistory.unshift({ prompt, url, publicId, style, meta, up, shape })
    setHistory(newHistory)
  }

  const handleClick = async () => {
    setProgress('1%')
    if (optionId === 'vars') {
      const shape = generated.shape
      setIsMakingVariants(true)
      const fullPrompt = assemblePrompt(caption, imageStyle.prompt, shape)
      const meta = makeString(generated.meta)
      const callData = {
        meta: meta,
        activeIndex: activeIndex?.index + 1,
        fullPrompt: fullPrompt,
      }
      getVariants(callData).then(async (res) => {
        if (!res.ok) {
          setIsGenerating(false)
          console.log(res.error)
          setIsError(true)
          setTimeout(() => {
            setIsError(false)
          }, 3000)
          return
        }
        const up = false
        const json = await res.json()
        setGenerated({ url: json.imgData.url, publicId: json.imgData.publicId, meta: json.meta, up: up, shape: shape })
        addToHistory(caption, json.imgData.url, json.imgData.publicId, imageStyle.id, json.meta, up, shape)
        setDetailMode(false)
        setIsMakingVariants(false)
      })
    } else {
      const shape = generated.shape
      setIsUpscaling(true)
      const meta = typeof generated.meta != 'string' ? JSON.stringify(generated.meta) : generated.meta
      upscale(meta, activeIndex?.index + 1).then(async (res) => {
        if (!res.ok) {
          console.log(res.error)
          return
        }
        const json = await res.json()
        const up = true
        setGenerated({ url: json.imgData.url, publicId: json.imgData.publicId, meta: json.meta, up: up, shape: shape })
        addToHistory(caption, json.imgData.url, json.imgData.publicId, imageStyle.id, json.meta, up, shape)
        setIsUpscaling(false)
      })
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'cursor-pointer border border-accent p-4 text-center text-accent font-semibold w-48 bg-bg-secondary rounded-md ',
        className,
        isSmall && 'w-auto mx-4'
      )}>
      {children}
    </div>
  )
}

function Selected() {
  const isMakingVariants = useAtomValue(isMakingVariantsAtom)
  const isUpscaling = useAtomValue(isUpscalingAtom)
  const isSmall = useIsSmall()
  return (
    <div className={cn('flex gap-4 w-full justify-center mt-3 mb-3', isSmall && 'flex-col')}>
      <Option optionId={cn('vars')}>{isMakingVariants ? 'Making Variations' : 'Make Variations'}</Option>
      <Option optionId='up'>{isUpscaling ? 'Upscaling' : 'Upscale'}</Option>
    </div>
  )
}

export default Selected
