import React, { useState } from 'react'
import { cn, upscale } from '../utils'
import { useAtom } from 'jotai'
import { isOrderingAtom, generatedAtom, activeIndexAtom, isUpscalingAtom, captionAtom, imageStyleAtom } from '../atoms'

function Order() {
  const [isOrdering, setIsOrdering] = useAtom(isOrderingAtom)
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [activeIndex, setActiveIndex] = useAtom(activeIndexAtom)
  const [isUpscaling, setIsUpscaling] = useAtom(isUpscalingAtom)
  const [caption, setCaption] = useAtom(captionAtom)
  const [imageStyle, setImageStyle] = useAtom(imageStyleAtom)
  const [history, setHistory] = useState([])

  const addToHistory = (prompt, url, publicId, style, meta, up) => {
    let newHistory = [...history]
    newHistory.unshift({ prompt, url, publicId, style, meta, up })
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
      setGenerated({ url: json.imgData.url, publicId: json.imgData.publicId, meta: json.meta, up: up })
      addToHistory(caption, json.imgData.url, json.imgData.publicId, imageStyle.id, json.meta, up)
      setIsUpscaling(false)
    })
  }

  const handleOrder = async () => {
    if (generated.up) {
      setIsOrdering(true)
    } else {
      await upscaleImage()
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
