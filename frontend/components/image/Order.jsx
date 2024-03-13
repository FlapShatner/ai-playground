import React, { useState } from 'react'
import { cn, upscale } from '../utils'
import { useLocalStorage } from 'usehooks-ts'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { isOrderingAtom, generatedAtom, activeIndexAtom, isUpscalingAtom, captionAtom, imageStyleAtom, shapeAtom } from '../atoms'

function Order() {
  const [history, setHistory] = useLocalStorage('history', [])
  const [windowProduct, setWindowProduct] = useLocalStorage('windowProduct', [])
  const [isOrdering, setIsOrdering] = useAtom(isOrderingAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const activeIndex = useAtomValue(activeIndexAtom)
  const caption = useAtomValue(captionAtom)
  const imageStyle = useAtomValue(imageStyleAtom)
  const setIsUpscaling = useSetAtom(isUpscalingAtom)

  const shape = generated.shape

  const addToHistory = (prompt, url, publicId, style, meta, up, shape) => {
    let newHistory = [...history]
    newHistory.unshift({ prompt, url, publicId, style, meta, up, shape })
    setHistory(newHistory)
  }

  const upscaleImage = async () => {
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

  const goToUrl = (url) => {
    window.location.href = url
  }

  const handleOrder = async () => {
    if (generated.up) {
      if (generated.shape.id == 'wi1') {
        setWindowProduct(generated)
        goToUrl('/products/ai-truck-back-window-graphics')
      }
      setIsOrdering(true)
    } else {
      await upscaleImage()
      if (generated.shape.id == 'wi1') {
        setWindowProduct(generated)
        goToUrl('/products/ai-truck-back-window-graphics')
        return
      }
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
