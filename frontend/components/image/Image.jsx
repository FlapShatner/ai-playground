import React, { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from '../utils'
import useIsSmall from '../hooks/useIsSmall'
import Grid from './Grid'
import Upscaled from './Upscaled'
import Progress from '../prompt/Progress'
import { useAtomValue, useAtom, useSetAtom } from 'jotai'
import {
  generatedAtom,
  captionAtom,
  isGeneratingAtom,
  isMakingVariantsAtom,
  isUpscalingAtom,
  shapeAtom,
  isWideAtom,
  detailModeAtom,
  promptAtom,
  imageStyleAtom,
} from '../atoms'
import Generating from './Generating'
import Placeholder from './Placeholder'
import Stack from './Stack'

function Image() {
  const [history, setHistory] = useLocalStorage('history', [])
  const [imageStyle, setImageStyle] = useAtom(imageStyleAtom)
  const [isWide, setIsWide] = useAtom(isWideAtom)
  const [detailMode, setDetailMode] = useAtom(detailModeAtom)
  const setPrompt = useSetAtom(promptAtom)
  const shape = useAtomValue(shapeAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [caption, setCaption] = useAtom(captionAtom)
  const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom)
  const [isMakingVariants, setIsMakingVariants] = useAtom(isMakingVariantsAtom)
  const [isUpscaling, setIsUpscaling] = useAtom(isUpscalingAtom)
  const isGenerated = generated?.url.length > 0

  const WS_URL = 'wss://tunnel.ink-dev.com/'
  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    shouldReconnect: () => true,
  })

  const addToHistory = (generatedObj) => {
    let newHistory = [...history]
    newHistory.unshift(generatedObj)
    setHistory(newHistory)
  }

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.event === 'generate' || lastJsonMessage.event === 'variations' || lastJsonMessage.event === 'upscale') {
        const shape = lastJsonMessage.shape
        const { imgData, meta, prompt, caption } = lastJsonMessage
        const generatedObj = {
          url: imgData.url,
          publicId: imgData.publicId,
          meta: meta,
          up: lastJsonMessage.event === 'upscale' ? true : false,
          shape: shape,
          prompt: prompt,
          caption: caption,
        }
        setGenerated(generatedObj)
        setIsUpscaling(false)
        setDetailMode(false)
        setIsGenerating(false)
        setIsMakingVariants(false)
        setCaption(caption)
        addToHistory(generatedObj)
        setPrompt('')
      }
    }
  }, [lastJsonMessage])

  const isSmall = useIsSmall()
  // const isSquare = true
  const isSquare = generated?.shape?.grid ? true : false

  return (
    <div className='relative m-auto'>
      {isGenerating || isMakingVariants || isUpscaling ? (
        <Generating />
      ) : isGenerated ? (
        <div>
          <p className='text-center'>{caption}</p>
          <div className={cn('w-[95vh] max-w-[700px] 2xl:max-w-[1000px] flex flex-col overflow-hidden relative border border-border', isSmall && 'w-full')}>
            {generated.up ? <Upscaled /> : <>{isSquare ? <Grid /> : <Stack />} </>}
          </div>
        </div>
      ) : (
        <Placeholder />
      )}
      {(isGenerating || isMakingVariants) && <Progress />}
    </div>
  )
}

export default Image
