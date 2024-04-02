import React, { useState } from 'react'
import { cn, assemblePrompt, makeString } from '../utils'
import useIsSmall from '../hooks/useIsSmall'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
    messageAtom,
    activeIndexAtom,
    generatedAtom,
    captionAtom,
    imageStyleAtom,
    isMakingVariantsAtom,
    isUpscalingAtom,
    progressAtom,
    selectedGuideAtom,
} from '../atoms'
import SelectedGuide from '../info/SelectedGuide'

function Option({ children, className, optionId }) {
    const [message, setMessage] = useAtom(messageAtom)
    const generated = useAtomValue(generatedAtom)

    const activeIndex = useAtomValue(activeIndexAtom)
    const imageStyle = useAtomValue(imageStyleAtom)
    const caption = useAtomValue(captionAtom)
    const setIsMakingVariants = useSetAtom(isMakingVariantsAtom)
    const setIsUpscaling = useSetAtom(isUpscalingAtom)
    const setProgress = useSetAtom(progressAtom)

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
    const setSelectedGuide = useSetAtom(selectedGuideAtom)
    const isMakingVariants = useAtomValue(isMakingVariantsAtom)
    const isUpscaling = useAtomValue(isUpscalingAtom)
    const isSmall = useIsSmall()
    return (
        <div className={cn('flex gap-4 w-full justify-center mt-3 mb-3', isSmall && 'flex-col-reverse w-3/4 mx-auto')}>
            <Option optionId='vars'>{isMakingVariants ? 'Making Variations' : 'Make Variations'}</Option>
            <Option optionId='up'>{isUpscaling ? 'Upscaling' : 'Upscale'}</Option>
            <SelectedGuide />
            <div
                onClick={() => setSelectedGuide(true)}
                className={cn('grid place-content-center border-2 border-accent rounded-md cursor-pointer font-semibold w-14 text-4xl text-accent bg-bg-secondary', isSmall && 'mx-4 ml-auto p-1')}>
                ?
            </div>
        </div>
    )
}

export default Selected
