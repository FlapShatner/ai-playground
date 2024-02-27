import React from 'react'
import { getVariants, upscale, cn } from '../utils'
import { useLocalStorage } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { activeIndexAtom, modifyIdAtom, generatedAtom, captionAtom, imageStyleAtom } from '../atoms'

function Option({ children, className, optionId }) {
  const [history, setHistory] = useLocalStorage('history', [])
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [activeIndex, setActiveIndex] = useAtom(activeIndexAtom)
  const [modifyId, setModifyId] = useAtom(modifyIdAtom)
  const [imageStyle, setImageStyle] = useAtom(imageStyleAtom)
  const [caption, setCaption] = useAtom(captionAtom)

  const addToHistory = (prompt, url, style, meta, up) => {
    let newHistory = [...history]
    newHistory.unshift({ prompt, url, style, meta, up })
    setHistory(newHistory)
  }

  const handleClick = async () => {
    if (optionId === 'vars') {
      const meta = typeof generated.meta != 'string' ? JSON.stringify(generated.meta) : generated.meta
      getVariants(meta, activeIndex?.index + 1).then(async (res) => {
        if (!res.ok) {
          console.log(res.error)
          return
        }
        const json = await res.json()
        setGenerated({ url: json.url, meta: json.meta })
        addToHistory(caption, json.url, imageStyle.id, json.meta)
      })

      // setCaption(data.meta.content)
    } else {
      const meta = typeof generated.meta != 'string' ? JSON.stringify(generated.meta) : generated.meta
      upscale(meta, activeIndex?.index + 1).then(async (res) => {
        if (!res.ok) {
          console.log(res.error)
          return
        }
        const json = await res.json()
        const up = true
        setGenerated({ url: json.url, meta: json.meta, up: true })
        addToHistory(caption, json.url, imageStyle.id, json.meta, up)
      })
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn('cursor-pointer border border-accent p-4 text-center text-accent font-semibold w-48 bg-bg-secondary rounded-md', className)}>
      {children}
    </div>
  )
}

function Selected() {
  return (
    <div className='flex gap-4 w-full justify-center mt-4'>
      <Option optionId='vars'>Make Variations</Option>
      <Option optionId='up'>Upscale </Option>
    </div>
  )
}

export default Selected
