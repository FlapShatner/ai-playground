import React from 'react'
import { cn } from '../utils'
import { getVariants } from '../utils'
import { useAtom } from 'jotai'
import { activeIndexAtom, modifyIdAtom, generatedAtom } from '../atoms'

function Option({ children, className, optionId }) {
  const [generated, setGenerated] = useAtom(generatedAtom)
  const [activeIndex, setActiveIndex] = useAtom(activeIndexAtom)
  const [modifyId, setModifyId] = useAtom(modifyIdAtom)

  const handleClick = async () => {
    if (optionId === 'vars') {
      const variants = await getVariants(generated.meta, activeIndex?.index)
      const json = await variants.json()
      setGenerated({ url: json.url, meta: json.meta })
      setCaption(prompt)
      addToHistory(prompt, json.url, imageStyle.id, json.meta)
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
