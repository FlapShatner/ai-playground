import React, { useState } from 'react'

import { prompts } from './prePrompt'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from './utils'
import HistoryModal from './HistoryModal'

function Gallery({ setCaption, setGenerated, generated, setImageStyle }) {
  const [history, setHistory] = useLocalStorage('history', [])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <p onClick={() => setIsOpen(!isOpen)} className='my-2 mx-auto sm:w-max text-center border-b border-b-border text-txt-primary cursor-pointer'>
        History
      </p>
      <div className='flex m-auto bg-bg-secondary relative max-w-[90vw] sm:max-w-[600px] border border-border pt-2 mb-4 '>
        <HistoryModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setCaption={setCaption}
          setGenerated={setGenerated}
          generated={generated}
          setImageStyle={setImageStyle}
        />
        <div className={cn('flex gap-3 px-2 overflow-x-scroll w-full min-h-28')}>
          {history.length > 0 &&
            history.map((item, i) => {
              const isActive = item.url == generated
              const handleClick = () => {
                setGenerated({ url: item.url, meta: item.meta })
                setCaption(item.prompt)
                const thisStyle = prompts.find((style) => style.id == item.style)
                if (!thisStyle) return
                setImageStyle(thisStyle)
              }
              return (
                <div onClick={handleClick} className='flex flex-col items-center cursor-pointer' key={i}>
                  <img className={cn('w-32 h-32 object-cover border border-border hover:border-accent', isActive && 'border-accent')} src={item.url} />
                  <p className='text-center text-txt-primary text-xs w-32 text-ellipsis overflow-hidden whitespace-nowrap'>{item.prompt}</p>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Gallery
