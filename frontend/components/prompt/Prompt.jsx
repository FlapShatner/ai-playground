import React, { useState, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'
import { toast } from 'react-toastify'
import useIsSmall from '../hooks/useIsSmall'
import { cn, assemblePrompt } from '../utils'
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
    isPromoOpenAtom
} from '../atoms'
function Prompt() {
    const [history, setHistory] = useLocalStorage('history-new', [])
    const [showAlert, setShowAlert] = useState(false)
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
            if (shape.id == "wi1") {
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
            <DevTools />
            <Suggestions />
            <Promo />
            <div className={cn('flex flex-col gap-4 w-full overflow-y-scroll max-h-[calc(85vh-71px)] pr-2', newButton && 'opacity-30 pointer-events-none')}>
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
                    <TextArea handleClick={handleClick} />
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
