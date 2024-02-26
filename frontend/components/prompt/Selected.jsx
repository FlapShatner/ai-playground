import React from 'react'
import { getVariants, cn } from '../utils'
import { useLocalStorage } from 'usehooks-ts'
import { useAtom } from 'jotai'
import { activeIndexAtom, modifyIdAtom, generatedAtom, captionAtom } from '../atoms'

function Option({ children, className, optionId }) {
  const [history, setHistory] = useLocalStorage('history', [])
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [activeIndex, setActiveIndex] = useAtom(activeIndexAtom)
  const [modifyId, setModifyId] = useAtom(modifyIdAtom)
  const [caption, setCaption] = useAtom(captionAtom)

  const addToHistory = (prompt, url, style = 'style', meta) => {
    let newHistory = [...history]
    newHistory.unshift({ prompt, url, style, meta })
    setHistory(newHistory)
  }

  const handleClick = async () => {
    if (optionId === 'vars') {
      const json = await getVariants(generated.meta, activeIndex?.index)
      setGenerated({ url: json.url, meta: json.meta })
      setCaption(json.meta.content)
      addToHistory(json.meta.content, json.url, json.meta)
    } else {
      setModifyId(`U${activeIndex.index}`)
    }
  }

  return (
    <div onClick={handleClick} className={cn('cursor-pointer border border-accent p-6 text-center', className)}>
      {children}
    </div>
  )
}

function Selected() {
  return (
    <div className='flex gap-4'>
      <Option optionId='vars'>Make Variations From Selected Image</Option>
      <Option optionId='up'>Upscale Selected Image</Option>
    </div>
  )
}

export default Selected
