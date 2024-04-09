import React, { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from '../utils'
import { wsUrl } from '../config'
import useIsSmall from '../hooks/useIsSmall'
import Grid from './Grid'
import Upscaled from './Upscaled'
import { useAtom, useSetAtom } from 'jotai'
import { generatedAtom, captionAtom, isGeneratingAtom, isMakingVariantsAtom, isUpscalingAtom, detailModeAtom, promptAtom } from '../atoms'
import Generating from './Generating'
import Placeholder from './Placeholder'
import Stack from './Stack'

function Image() {
    const [history, setHistory] = useLocalStorage('history-new', [])
    const setDetailMode = useSetAtom(detailModeAtom)
    const setPrompt = useSetAtom(promptAtom)
    const [generated, setGenerated] = useAtom(generatedAtom)
    const [caption, setCaption] = useAtom(captionAtom)
    const [isGenerating, setIsGenerating] = useAtom(isGeneratingAtom)
    const [isMakingVariants, setIsMakingVariants] = useAtom(isMakingVariantsAtom)
    const [isUpscaling, setIsUpscaling] = useAtom(isUpscalingAtom)
    const isGenerated = generated?.url.length > 0

    const WS_URL = wsUrl
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
    const isSquare = generated?.shape?.grid ? true : false

    return (
        <div className='relative mt-auto mx-auto'>
            {isGenerating || isMakingVariants || isUpscaling ? (
                <Generating />
            ) : isGenerated ? (
                <div>
                    <p className='text-center'>{caption}</p>
                    <p className='text-center'>{generated.shape.label}</p>
                    <div
                        className={cn(
                            'w-[80vh] max-w-[700px] 2xl:max-w-[1000px] min-h-[82vh]  flex flex-col overflow-hidden relative border border-border',
                            isSmall && 'w-full min-h-[400px]'
                        )}>
                        {generated.up ? <Upscaled /> : <>{isSquare ? <Grid /> : <Stack />} </>}
                    </div>
                </div>
            ) : (
                <Placeholder />
            )}
        </div>
    )
}

export default Image
