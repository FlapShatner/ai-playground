import React, { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { toast } from 'react-toastify'
import { cn, assemblePrompt, makeString } from '../utils'
import { getTimeLeft, getHoursAndMinutes } from '../utils/coolDownUtils'
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
    timeLeftAtom,
    cooldownOpenAtom,
} from '../atoms'
import SelectedGuide from '../info/SelectedGuide'
import Cooldown from '../cooldown/Cooldown'

function Option({ children, className, optionId }) {
    const [message, setMessage] = useAtom(messageAtom)
    const generated = useAtomValue(generatedAtom)
    const activeIndex = useAtomValue(activeIndexAtom)
    const imageStyle = useAtomValue(imageStyleAtom)
    const caption = useAtomValue(captionAtom)
    const setIsMakingVariants = useSetAtom(isMakingVariantsAtom)
    const setIsUpscaling = useSetAtom(isUpscalingAtom)
    const setProgress = useSetAtom(progressAtom)
    const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom)
    const [cooldownOpen, setCooldownOpen] = useAtom(cooldownOpenAtom)

    const [genMeta, setGenMeta] = useLocalStorage('genMeta', { count: 0, cooldown: false, cooldownTime: 0 })
    const isSmall = useIsSmall()

    const startVar = async (currMeta) => {
        setProgress('1%')
        if (optionId === 'vars') {
            setGenMeta({ ...currMeta, count: currMeta.count + 1 })
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

    const handleClick = async () => {
        if (optionId === 'vars') {
            let currentGenMeta = { ...genMeta }
            console.log("Cooldown Status:", currentGenMeta.cooldown);
            console.log("Cooldown Time:", currentGenMeta.cooldownTime);
            if (currentGenMeta.cooldown) {
                const currTimeLeft = getTimeLeft(currentGenMeta.cooldownTime);
                if (currTimeLeft <= 0) {
                    console.log("Resetting Cooldown", currTimeLeft);
                    currentGenMeta = { count: 0, cooldown: false, cooldownTime: 0 };
                    return startVar(currentGenMeta)
                } else {
                    const { hours, minutes } = getHoursAndMinutes(currTimeLeft);
                    setTimeLeft(`${hours} hours and ${minutes} minutes`);
                    setCooldownOpen(true);
                    return;
                }
            }
            if (genMeta.count >= 8) {
                console.log("Setting Cooldown", genMeta.count);
                setGenMeta({ count: 0, cooldown: true, cooldownTime: Date.now() });
                setTimeLeft('24 hours');
                setCooldownOpen(true);
                return;
            }
        }
        startVar(genMeta);
    }

    // const handleClick = async () => {
    //     if (optionId == 'vars') {
    //         if (genMeta.cooldown) {
    //             const timeDiff = Date.now() - genMeta.cooldownTime
    //             // const currTimeLeft = 86400000 - timeDiff
    //             const currTimeLeft = 8000 - timeDiff
    //             console.log(currTimeLeft)
    //             if (currTimeLeft <= 0) {
    //                 setGenMeta({ count: 0, cooldown: false, cooldownTime: 0 })
    //             } else {
    //                 const hours = Math.floor((currTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    //                 const minutes = Math.floor((currTimeLeft % (1000 * 60 * 60)) / (1000 * 60))
    //                 setTimeLeft(`${hours} hours and ${minutes} minutes`)
    //                 setCooldownOpen(true)
    //                 return
    //             }
    //         }
    //         if (genMeta.count >= 1) {
    //             setGenMeta({ ...genMeta, cooldown: true, cooldownTime: Date.now() })
    //             setTimeLeft('24 hours')
    //             setCooldownOpen(true)
    //             return
    //         }
    //     }
    //     startVar()
    // }

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
        <div className={cn('flex gap-4 w-full justify-center mt-3 mb-3', isSmall && 'flex-col')}>
            <Option optionId='vars'>{isMakingVariants ? 'Making Variations' : 'Make Variations'}</Option>
            <Option optionId='up'>{isUpscaling ? 'Upscaling' : 'Upscale'}</Option>
            <SelectedGuide />
            <div
                onClick={() => setSelectedGuide(true)}
                className={cn('grid place-content-center border-2 border-accent rounded-md cursor-pointer font-semibold w-14 text-4xl text-accent bg-bg-secondary', isSmall && 'w-24 m-auto')}>
                ?
            </div>
        </div>
    )
}

export default Selected
